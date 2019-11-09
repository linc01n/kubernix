var N=null,E="",T="t",U="u",searchIndex={};
var R=["kubernix","option","result","string","levelfilter","config","try_from","try_into","borrow_mut","borrow","type_id","argmatches","Kubernix"];

searchIndex["kubernix"]={"doc":R[0],"i":[[3,"Config",R[0],"The global configuration",N,N],[3,"Logger",E,"The main logging faccade",N,N],[3,R[12],E,"The main entry point for the application",N,N],[11,"subcommand",E,"All available subcommands",0,[[["self"]],[R[1]]]],[11,"root",E,"Path where all the runtime data is stored",0,[[["self"]],["pathbuf"]]],[11,"overlay",E,"The Nix package overlay to be used",0,[[["self"]],[R[1]]]],[11,"packages",E,"Additional dependencies to be added to the environment",0,[[["self"]],["vec"]]],[11,"shell",E,"The shell executable to be used, defaults to $SHELL,…",0,[[["self"]],[R[1]]]],[11,"container_runtime",E,"The container runtime to be used for the nodes, irrelevant…",0,[[["self"]],[R[3]]]],[11,"log_level",E,"The logging level of the application",0,[[["self"]],[R[4]]]],[11,"cidr",E,"The CIDR used for the cluster",0,[[["self"]],["ipv4network"]]],[11,"nodes",E,"The number of nodes to be registered",0,[[["self"]],["u8"]]],[11,"no_shell",E,"Do not spawn an interactive shell after bootstrap",0,[[["self"]],["bool"]]],[11,"canonicalize_root",E,"Make the configs root path absolute",0,[[["self"]],[R[2]]]],[11,"to_file",E,"Write the current configuration to the internal set root…",0,[[["self"]],[R[2]]]],[11,"try_load_file",E,"Read the configuration from the internal set root path If…",0,[[["self"]],[R[2]]]],[11,"shell_ok",E,"Return the set shell as result type",0,[[["self"]],[[R[2],[R[3]]],[R[3]]]]],[11,"multi_node",E,"Returns true if multi node support is enabled",0,[[["self"]],["bool"]]],[11,"new",E,"Create a new logger",1,[[[R[4]]],["box"]]],[11,"error",E,"Log an error message",1,[[["str"]]]],[11,"start",E,"Start kubernix by consuming the provided configuration",2,[[[R[5]]],[R[2]]]],[11,"new_shell",E,"Spawn a new shell into the provided configuration…",2,[[[R[5]]],[R[2]]]],[11,"into",E,E,0,[[],[U]]],[11,"from",E,E,0,[[[T]],[T]]],[11,R[6],E,E,0,[[[U]],[R[2]]]],[11,R[7],E,E,0,[[],[R[2]]]],[11,R[8],E,E,0,[[["self"]],[T]]],[11,R[9],E,E,0,[[["self"]],[T]]],[11,R[10],E,E,0,[[["self"]],["typeid"]]],[11,"vzip",E,E,0,[[],["v"]]],[11,"into",E,E,1,[[],[U]]],[11,"from",E,E,1,[[[T]],[T]]],[11,R[6],E,E,1,[[[U]],[R[2]]]],[11,R[7],E,E,1,[[],[R[2]]]],[11,R[8],E,E,1,[[["self"]],[T]]],[11,R[9],E,E,1,[[["self"]],[T]]],[11,R[10],E,E,1,[[["self"]],["typeid"]]],[11,"vzip",E,E,1,[[],["v"]]],[11,"into",E,E,2,[[],[U]]],[11,"from",E,E,2,[[[T]],[T]]],[11,R[6],E,E,2,[[[U]],[R[2]]]],[11,R[7],E,E,2,[[],[R[2]]]],[11,R[8],E,E,2,[[["self"]],[T]]],[11,R[9],E,E,2,[[["self"]],[T]]],[11,R[10],E,E,2,[[["self"]],["typeid"]]],[11,"vzip",E,E,2,[[],["v"]]],[11,"drop",E,E,2,[[["self"]]]],[11,"into",E,E,0,[[],["app"]]],[11,"default",E,E,0,[[],["self"]]],[11,"from",E,E,0,[[[R[11]]],["self"]]],[11,"deserialize",E,E,0,[[["__d"]],[R[2]]]],[11,"serialize",E,E,0,[[["self"],["__s"]],[R[2]]]],[11,"enabled",E,E,1,[[["self"],["metadata"]],["bool"]]],[11,"log",E,E,1,[[["self"],["record"]]]],[11,"flush",E,E,1,[[["self"]]]],[11,"from_argmatches",E,E,0,[[[R[11]]],["self"]]],[11,"into_app",E,E,0,[[],["app"]]]],"p":[[3,"Config"],[3,"Logger"],[3,R[12]]]};
initSearch(searchIndex);addSearchOptions(searchIndex);