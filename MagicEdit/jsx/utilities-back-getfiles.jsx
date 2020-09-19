






// check Set folder condition
// Set folder's name can't contain some specific strings.
function isSetFolder(folder_name){
	if (folder_name.indexOf('(')!=-1 
		|| folder_name.indexOf(')')!=-1
		||folder_name.indexOf('Preview')!=-1) {
		return false;
	}
	return true;
}


// ------------------------------------------
// get all files from a path.
/*	function getFilesFromPath(path, name_or_fullname_or_folder){
			

		var thisFolder = Folder(path);
		var files = thisFolder.getFiles();

		var fullPaths = [];
		if (name_or_fullname_or_folder=="name") {
			for (var i =0; i<files.length; i++) {
			
			fullPaths.push(File.decode(files[i].name));
			}
		}else if (name_or_fullname_or_folder=="fullName"){
			for (var i =0; i<files.length; i++) {
			
			fullPaths.push(files[i].fullName);
			}
		} else if(name_or_fullname_or_folder == "folder"){
			for (var i =0; i<files.length; i++) {
			
			fullPaths.push(files[i]);
			}
		} 
		else {
			alert("getFilesFromPath() => please pass an valid name_or_fullname argument");
		}
		

		return fullPaths;
	}*/

function getPositionOfFolder(folder_array,name_to_get){
	var result = undefined;
	for(x in folder_array){
		if (File.decode(folder_array[x].name).indexOf(name_to_get)!=-1) {
			result=folder_array[x];
			break;
		}
	}
	return result;
}
function filterFilesByFileType(files_array,postfix){
	var result = [];
	for(i=0;i<files_array.length;i++){
		if (files_array[i].name.indexOf(postfix)!=-1) {
			result.push(files_array[i]);
		}
	}
	return result;
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
function ccvl(){
	alert("For error report or any working-related purposes, please contact:"+
		"\nFanpage Viet Filmmaker: fb.com/vietfilmmaker"+
		"\nOur developers: lvtute@gmail.com"+
		"\nOwner: thuanstudio95@gmail.com"+
		"\nDon't hesitate, your feedback is our pleasure. :-)","Contact us",false);
}


