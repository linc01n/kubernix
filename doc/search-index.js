var N=null,E="",T="t",U="u",searchIndex={};
var R=["kubernix","pathbuf","levelfilter","ipnetwork","string","config","fallible","log_level","crio_cidr","cluster_cidr","service_cidr","try_from","try_into","result","borrow_mut","type_id","configbuilder","ConfigBuilder","Kubernix"];

searchIndex["kubernix"]={"doc":R[0],"i":[[3,"Config",R[0],"The global configuration",N,N],[3,R[17],E,"Builder for `Config`.",N,N],[3,R[18],E,"The main entry point for the application",N,N],[11,"root",E,"The root path during runtime",0,[[["self"],[R[1]],["into",[R[1]]]],["self"]]],[11,R[7],E,"The logging level of the application",0,[[["self"],[R[2]],["into",[R[2]]]],["self"]]],[11,R[8],E,"Container Networking CIDR for CRI-O",0,[[["self"],[R[3]],["into",[R[3]]]],["self"]]],[11,R[9],E,"Cluster CIDR",0,[[["self"],[R[3]],["into",[R[3]]]],["self"]]],[11,R[10],E,"Service CIDR",0,[[["self"],[R[3]],["into",[R[3]]]],["self"]]],[11,"build",E,"Builds a new `Config`.",0,[[["self"]],[[R[4]],[R[13],[R[5],R[4]]],[R[5]]]]],[11,"canonicalize_root",E,"Make the configs root path absolute",1,[[["self"]],[R[6]]]],[11,"to_file",E,"Write the current configuration to the internal set root…",1,[[["self"]],[R[6]]]],[11,"update_from_file",E,"Read the configuration from the internal set root path",1,[[["self"]],[R[6]]]],[11,"root",E,"Retrieve the root path",1,[[["self"]],["path"]]],[11,R[7],E,"Retrieve the log level",1,[[["self"]],[R[2]]]],[11,R[8],E,"Retrieve the CRI-O container CIDR",1,[[["self"]],[R[3]]]],[11,R[9],E,"Retrieve the cluster CIDR",1,[[["self"]],[R[3]]]],[11,R[10],E,"Retrieve the service CIDR",1,[[["self"]],[R[3]]]],[11,"start",E,"Start kubernix by consuming the provided configuration",2,[[[R[5]]],[R[6]]]],[11,"new_shell",E,"Spawn a new shell into the provided configuration…",2,[[[R[5]]],[R[6]]]],[11,"from",E,E,1,[[[T]],[T]]],[11,"into",E,E,1,[[],[U]]],[11,R[11],E,E,1,[[[U]],[R[13]]]],[11,R[12],E,E,1,[[],[R[13]]]],[11,R[14],E,E,1,[[["self"]],[T]]],[11,"borrow",E,E,1,[[["self"]],[T]]],[11,R[15],E,E,1,[[["self"]],["typeid"]]],[11,"vzip",E,E,1,[[],["v"]]],[11,"from",E,E,0,[[[T]],[T]]],[11,"to_owned",E,E,0,[[["self"]],[T]]],[11,"clone_into",E,E,0,[[["self"],[T]]]],[11,"into",E,E,0,[[],[U]]],[11,R[11],E,E,0,[[[U]],[R[13]]]],[11,R[12],E,E,0,[[],[R[13]]]],[11,R[14],E,E,0,[[["self"]],[T]]],[11,"borrow",E,E,0,[[["self"]],[T]]],[11,R[15],E,E,0,[[["self"]],["typeid"]]],[11,"vzip",E,E,0,[[],["v"]]],[11,"from",E,E,2,[[[T]],[T]]],[11,"into",E,E,2,[[],[U]]],[11,R[11],E,E,2,[[[U]],[R[13]]]],[11,R[12],E,E,2,[[],[R[13]]]],[11,R[14],E,E,2,[[["self"]],[T]]],[11,"borrow",E,E,2,[[["self"]],[T]]],[11,R[15],E,E,2,[[["self"]],["typeid"]]],[11,"vzip",E,E,2,[[],["v"]]],[11,"default",E,E,0,[[],[R[16]]]],[11,"default",E,E,1,[[],["self"]]],[11,"drop",E,E,2,[[["self"]]]],[11,"clone",E,E,0,[[["self"]],[R[16]]]],[11,"fmt",E,E,1,[[["self"],["formatter"]],[R[13]]]],[11,"deserialize",E,E,1,[[["__d"]],[R[13]]]],[11,"serialize",E,E,1,[[["self"],["__s"]],[R[13]]]]],"p":[[3,R[17]],[3,"Config"],[3,R[18]]]};
initSearch(searchIndex);addSearchOptions(searchIndex);