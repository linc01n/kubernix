use crate::system::System;
use crossbeam_channel::{bounded, Receiver, Sender};
use failure::{bail, format_err, Fallible};
use log::{debug, error, info};
use nix::{
    sys::signal::{kill, Signal},
    unistd::Pid,
};
use std::{
    fs::{self, create_dir_all, metadata, set_permissions, File},
    io::{BufRead, BufReader},
    os::unix::fs::PermissionsExt,
    path::{Path, PathBuf},
    process::{Command, Stdio},
    thread::{spawn, JoinHandle},
    time::Instant,
};

/// A general process abstraction
pub struct Process {
    command: String,
    died: Receiver<()>,
    kill: Sender<()>,
    log_file: PathBuf,
    name: String,
    pid: u32,
    readyness_timeout: u64,
    watch: Option<JoinHandle<Fallible<()>>>,
}

/// The trait to stop something
pub trait Stoppable {
    /// Stop the process
    fn stop(&mut self) -> Fallible<()>;
}

/// A started process
pub type Started = Box<dyn Stoppable + Send + Sync>;

/// A vector of processes which can be stopped
pub type Stoppables = Vec<Started>;

/// The process state as result
pub type ProcessState = Fallible<Started>;

impl Process {
    /// Creates a new `Process` instance by spawning the provided command `cmd`.
    /// If the process creation fails, an `Error` will be returned.
    pub fn start(dir: &Path, identifier: &str, command: &str, args: &[&str]) -> Fallible<Process> {
        // Prepare the commands
        if command.is_empty() {
            bail!("No valid command provided")
        }

        // Write the executed command into the dir
        create_dir_all(dir)?;
        let command_path = System::find_executable(command)?;
        let run_file = dir.join("run.sh");

        // If the run file exists, exists only that one
        if !run_file.exists() {
            // Write the run file
            let sep = format!(" \\\n{}", " ".repeat(4));
            let full_command = format!(r#"{}{}{}"#, command_path.display(), sep, args.join(&sep));
            fs::write(
                &run_file,
                format!(include_str!("assets/run.sh"), full_command),
            )
            .map_err(|e| format_err!("Unable to create '{}': {}", run_file.display(), e))?;
            let mut perms = metadata(&run_file)?.permissions();
            perms.set_mode(0o755);
            set_permissions(&run_file, perms)?;
        };

        // Prepare the log dir and file
        let mut log_file = dir.join(command);
        log_file.set_extension("log");
        let out_file = File::create(&log_file)?;
        let err_file = out_file.try_clone()?;

        // Spawn the process child
        let mut child = Command::new(run_file)
            .stderr(Stdio::from(err_file))
            .stdout(Stdio::from(out_file))
            .spawn()
            .map_err(|e| {
                format_err!(
                    "Unable to start process '{}' ({}): {}",
                    identifier,
                    command,
                    e
                )
            })?;

        let (kill, killed) = bounded(1);
        let (dead, died) = bounded(1);
        let c = command.to_owned();
        let n = identifier.to_owned();
        let pid = child.id();
        let watch = spawn(move || {
            // Wait for the process to exit
            let status = child.wait()?;

            // No kill send, we assume that the process died
            if killed.try_recv().is_err() {
                error!("Process '{}' ({}) died unexpectedly", n, c);
                dead.send(())?;
            } else {
                info!("Process '{}' ({}) stopped", n, c);
            }
            debug!("{} ({}) {}", n, c, status);
            Ok(())
        });

        Ok(Process {
            command: command.into(),
            died,
            kill,
            log_file,
            name: identifier.into(),
            pid,
            readyness_timeout: 120,
            watch: Some(watch),
        })
    }

    // Wait for the process to become ready, by searching for the pattern in
    // every line of its output.
    pub fn wait_ready(&mut self, pattern: &str) -> Fallible<()> {
        debug!(
            "Waiting for process '{}' ({}) to become ready with pattern: '{}'",
            self.name, self.command, pattern
        );
        let now = Instant::now();
        let file = File::open(&self.log_file)?;
        let mut reader = BufReader::new(file);

        while now.elapsed().as_secs() < self.readyness_timeout {
            let mut line = String::new();
            reader.read_line(&mut line)?;

            if line.contains(pattern) {
                debug!("Found pattern '{}' in line '{}'", pattern, line.trim());
                return Ok(());
            }

            if self.died.try_recv().is_ok() {
                bail!("Process '{}' ({}) died", self.command, self.name)
            }
        }

        // Cleanup since process is not ready
        self.stop()?;
        error!(
            "Timed out waiting for process '{}' ({}) to become ready",
            self.name, self.command
        );
        bail!("Process timeout")
    }

    /// Retrieve a pseudo state for stopped processes
    pub fn stopped() -> ProcessState {
        bail!("Process not started yet")
    }
}

impl Stoppable for Process {
    /// Stopping the process by killing it
    fn stop(&mut self) -> Fallible<()> {
        debug!("Stopping process {} (via {})", self.name, self.command);

        // Indicate that this shutdown is intended
        self.kill.send(()).map_err(|e| {
            format_err!(
                "Unable to send kill signal to process {} (via {}): {}",
                self.name,
                self.command,
                e
            )
        })?;

        // Send SIGTERM to the process
        kill(Pid::from_raw(self.pid as i32), Signal::SIGTERM)?;

        // Join the waiting thread
        if let Some(handle) = self.watch.take() {
            if handle.join().is_err() {
                bail!(
                    "Unable to stop process {} (via {})",
                    self.name,
                    self.command
                );
            }
        }
        debug!("Process {} (via {}) stopped", self.name, self.command);
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn stopped() {
        assert!(Process::stopped().is_err())
    }

    #[test]
    fn start_success() -> Fallible<()> {
        let d = tempdir()?;
        Process::start(d.path(), "", "echo", &[])?;
        Ok(())
    }

    #[test]
    fn start_failure_no_command() -> Fallible<()> {
        let d = tempdir()?;
        assert!(Process::start(d.path(), "", "", &[]).is_err());
        Ok(())
    }

    #[test]
    fn start_failure_invalid_command() -> Fallible<()> {
        let d = tempdir()?;
        assert!(Process::start(d.path(), "", "invalid_command", &[]).is_err());
        Ok(())
    }

    #[test]
    fn wait_ready_success() -> Fallible<()> {
        let d = tempdir()?;
        let mut p = Process::start(d.path(), "", "echo", &["test"])?;
        p.wait_ready("test")?;
        Ok(())
    }

    #[test]
    fn wait_ready_failure() -> Fallible<()> {
        let d = tempdir()?;
        let mut p = Process::start(d.path(), "", "echo", &["test"])?;
        p.readyness_timeout = 1;
        assert!(p.wait_ready("invalid").is_err());
        Ok(())
    }

    #[test]
    fn stop_success() -> Fallible<()> {
        let d = tempdir()?;
        let mut p = Process::start(d.path(), "", "sleep", &["500"])?;
        p.stop()?;
        Ok(())
    }
}
