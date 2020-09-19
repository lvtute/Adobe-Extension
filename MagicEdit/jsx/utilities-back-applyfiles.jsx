// apply aep file
function importAep(path){
	alert(path);
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
	var previewXml = XML("<preview>"+previewName+"</preview>");

	// var aepXml;
	// alert(xmlRoot.descendants("aep"));
	for(var i=0; i< xmlRoot.descendants("aep").length();i++){
		if (xmlRoot.descendants("aep")[i].contains(previewXml)) {
			aepXml= xmlRoot.descendants("aep")[i];
			break;
		}
	}
	// alert(aepXml.toXMLString());

	for(var i=0; i< previewXml.length();i++){
		if (previewXml[i].toString()==previewName) {
			previewXml = (previewXml[i]);
			break;
		}
	}
	
	var aepPath  = getAepPath(aepXml);

	// alert(aepPath);
	// alert(File(aepPath).exists);
	var compName = previewName.replace(".mp4","");
	importProjectAndApplyComp(aepPath,compName);
	return "hello";
}
function importProjectAndApplyComp(aepPath, compName){
	// alert(aepPath);
	var compLocations= [];
	
	var aepName = aepPath.slice(aepPath.lastIndexOf("/")+1,aepPath.length);

	var isExisted = false;
	for(var i=1; i<= app.project.numItems; i++){

		// alert("aep: "+aepName+"\nitem: "+app.project.items[i].name);
		aepName = File.decode(aepName);
		if (aepName == app.project.items[i].name) {
			isExisted = true;
			break;
		}
	}
	// alert(isExisted);
	app.beginUndoGroup("Add comp");
	app.beginSuppressDialogs();
	if (isExisted==false) {
		var item = app.project.importFile(new ImportOptions(File(aepPath)));
	}
	
	var flag = false;
	for(var i=1; i<= app.project.numItems; i++){
		if (app.project.item(i) instanceof CompItem 
			&& app.project.item(i).name==compName) {
			app.project.item(i).openInViewer();
			alert("Composition: "+app.project.item(i).name+" applied!", "Composition apply");
			flag = true;
		}	
		
	}
	if (flag == false) {
		alert("Composition: "+compName+" not found!");		
	}


	app.endSuppressDialogs(false);
	app.endUndoGroup();
	// // alert(compLocations);
	// // alert(app.project.items[compLocations[compIndex-1]].name);
	// if (app.project.items[compLocations[compIndex-1]] instanceof CompItem) {
	// 	alert(app.project.items[compLocations[compIndex-1]].name);
	// 	return app.project.items[compLocations[compIndex-1]].openInViewer();
	// }
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