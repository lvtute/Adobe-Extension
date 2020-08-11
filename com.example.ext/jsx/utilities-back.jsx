function sayHello(){
	alert("hello from ExtendScript");
}
// ------------------------------------------
// get all files from a path.
function getFilesFromPath(path){
	var thisFolder = Folder(path);
	var files = thisFolder.getFiles();

	var fullPaths = [];
	for (var i =0; i<files.length; i++) {
		fullPaths.push(files[i].fsName);
	}
	alert (fullPaths.length);
	return fullPaths;
}
// ------------------------------------------