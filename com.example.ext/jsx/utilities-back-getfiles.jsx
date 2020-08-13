

var packFolder = "~/Downloads/Motion Bro Free Pack/FREE";
var testFile = File(packFolder);
alert("testFile: "+(testFile instanceof Folder));
function getAllSets(){
	
	var result  = getFilesFromPath(packFolder,"name");
	// alert("result: "+result.toString());
	var positionsToRemove=[];
	for(var i=0; i<result.length; i++){

	
		if (!isSetFolder(result[i])) {
			
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

// return an array of aep files name
// consider loop all folder to get all aep files
function getAepFilesName(set_name){
	var aepFolder = packFolder+"/"+set_name;
	// alert(aepFolder);
	var allFilesInThatFolder = getFilesFromPath(aepFolder,"name");
	

}

// ------------------------------------------
// get all files from a path.
function getFilesFromPath(path, name_or_fullname){
		

	var thisFolder = Folder(path);
	var files = thisFolder.getFiles();

	var fullPaths = [];
	if (name_or_fullname=="name") {
		for (var i =0; i<files.length; i++) {
		
		fullPaths.push(File.decode(files[i].name));
		}
	}else if (name_or_fullname=="fullName"){
		for (var i =0; i<files.length; i++) {
		
		fullPaths.push(files[i].fullName);
		}
	} else {
		alert("getFilesFromPath() => please pass an valid name_or_fullname argument");
	}
	

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


