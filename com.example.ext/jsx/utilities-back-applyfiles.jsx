// apply aep file
function importAep(path){

	var folder = Folder(path);
	var files = folder.getFiles();
	var aepFiles = [];
	// File()
	for (var i = 0; i < files.length; i++) {
		if (files[i].name.indexOf('.aep')!=-1) {
			aepFiles.push(files[i].fsName);
		}
	}

	
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
	// alert(attr);
	
	// app.project.items[1].remove();
}