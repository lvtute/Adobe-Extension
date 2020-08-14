

var packFolder = "~/Downloads/Motion Bro Free Pack/FREE";
var ALL_FOLDERS_IN_PACK = getFilesFromPath(packFolder,"folder");
 // Folder objects array
var ALL_SET_FOLDER = getSetFoldersOnly(ALL_FOLDERS_IN_PACK);




function getSetFoldersOnly(folder_array){
	var result  = folder_array;
	// alert("result: "+result.toString());
	var positionsToRemove=[];
	for(var i=0; i<result.length; i++){

	
		if (!isSetFolder(result[i].name)) {
			
			positionsToRemove.push(i);
		}
	}
	
	while (positionsToRemove.length>0) {
		
		result.splice(positionsToRemove.pop(),1);
	}
	
	return result;
}



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
function getFilesFromPath(path, name_or_fullname_or_folder){
		

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
}

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


