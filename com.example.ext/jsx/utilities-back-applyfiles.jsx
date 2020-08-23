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
	// alert(comp.name);
	// alert("label: "+comp.label+"; "+"comment: "+ comp.comment +"; "+ comp.id);
	// alert(comp instanceof CompItem);
	// comp.openInViewer();
	var attr;
	for( a in comp){
		attr += a+"; ";
	}
	// alert(attr);
	
	// app.project.items[1].remove();
}
function applyComp(previewName){
	// alert(previewName);
	var previewXml = xmlRoot.descendants("preview");
	for(var i=0; i< previewXml.length();i++){
		if (previewXml[i].toString()==previewName) {
			previewXml = (previewXml[i]);
			break;
		}
	}
	// alert(previewXml.toXMLString());
	var Aep =  previewXml.parent();
	// alert(Aep);
	var aepPath  = getAepPath(Aep);
	// alert(File(aepPath).exists);
	var compIndex = previewXml.childIndex();
	// alert(importProjectAndApplyComp(aepPath,compIndex));
	return "hello";
}
function importProjectAndApplyComp(aepPath, compIndex){
	// alert(aepPath);
	var compLocations= [];
	
	var aepName = aepPath.slice(aepPath.lastIndexOf("/")+1,aepPath.length);
	var isExisted = false;
	for(var i=1; i<= app.project.numItems; i++){
		if (aepName == app.project.items[i].name) {
			isExisted = true;
			break;
		}
	}
	// alert(isExisted);
	app.beginUndoGroup("Add comp:"+ aepPath+"["+compIndex+"]");
	app.beginSuppressDialogs();
	if (isExisted==false) {
		var item = app.project.importFile(new ImportOptions(File(aepPath)));
	}
	
	//var comp = app.project.item(compIndex);
	// alert(app.project.reflect.properties);
	// alert(app.activeViewer);
	// app.activate();
	// alert(app.project.items.length);
	// alert(app.project.numItems);
	// alert(app.project.items[1].name);
	for(var i=1; i<= app.project.numItems; i++){
		if (app.project.item(i) instanceof CompItem) {
			compLocations.push(i);
		}	
	}

	app.endSuppressDialogs(false);
	app.endUndoGroup();
	// alert(compLocations);
	// alert(app.project.items[compLocations[compIndex-1]].name);
	if (app.project.items[compLocations[compIndex-1]] instanceof CompItem) {
		return app.project.items[compLocations[compIndex-1]].openInViewer();
	}
	return null;
}

function getAepPath(aepXmlObject){
	var result = "";
	var set = aepXmlObject.parent();
	result+=(set.@path)+"/";
	result+=set.text().toString()+"/";
	result+=aepXmlObject.text().toString();
	// alert(File(result).exists);
	return result;
	
}