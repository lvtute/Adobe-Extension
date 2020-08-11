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

function getLayerNames(arg) {
	var layerNames = [];
	var comp = app.project.activeItem;
	for(var i = 1; i <= comp.numLayers; i++) {
		layerNames.push(comp.layer(i).name);
	}

	return JSON.stringify(layerNames);
}

function osCheck() {
	var os = $.os;
	var match = os.indexOf("Windows");
	if(match != (-1)) {
		var userOS = "PC";
	} else {
		var userOS = "MAC";
	}
	return userOS;
}
// apply aep file
function importAep(path){
	// alert(path);
	var folder = Folder(path);
	var files = folder.getFiles();
	var aepFiles = [];
	File()
	for (var i = 0; i < files.length; i++) {
		if (files[i].name.indexOf('.aep')!=-1) {
			aepFiles.push(files[i].fsName);
		}
	}

	// alert(aepFiles);
	// alert(File(aepFiles[0]).exists);
	
	var item = app.project.importFile(new ImportOptions(File(aepFiles[0])));
	var comp = app.project.item(1).items[2];
	var comp2 = app.project.item(1).name;
	// comp.openInViewer();
	alert(comp.name);
	alert("label: "+comp.label+"; "+"comment: "+ comp.comment +"; "+ comp.id);
	alert(comp instanceof CompItem);
	// comp.openInViewer();
	var attr;
	for( a in comp){
		attr += a+"; ";
	}
	alert(attr);
	
	// app.project.items[1].remove();

	
}