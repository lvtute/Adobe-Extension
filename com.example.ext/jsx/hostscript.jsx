/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// #include "json2.js"
#include "utilities-back-getfiles.jsx"
#include "utilities-back-applyfiles.jsx"
#include "XmlUtilities.jsx"

var xmlRoot = XML("<root></root>");
var props = this.reflect.methods;





// called when applicaiton start
function getAllSets(){ // for front to call

	
	var result = [];
	
	for(var i=0; i<ALL_SET_FOLDER.length; i++){
		result.push(File.decode(ALL_SET_FOLDER[i].name));
	}
	return result;
}


// called when user click on a set name
function getAllAepFromSet(set_name){
	var setFolder = getPositionOfFolder(ALL_SET_FOLDER,set_name);
	var result = [];
	var allFiles = setFolder.getFiles();
	allFiles = filterFilesByFileType(allFiles,".aep");
	for (var i=0; i< allFiles.length;i++){
		result.push(File.decode(allFiles[i].name));
	}

	return result;
}

  // importListFile();