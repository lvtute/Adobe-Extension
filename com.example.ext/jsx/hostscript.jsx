/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// #include "json2.js"
#include "utilities-back-getfiles.jsx"
#include "utilities-back-applyfiles.jsx"


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

  // read file
  var importListFile = function(){
  	var file =File.openDialog ("Please select list file", false);

  	file.encoding = 'utf-8';
  	file.open('r');
  	var content = file.read();

        //    alert("content:\n"+ content);
        $.evalFile(file);

        var newXML  = XMLList(x);

            //alert("newXML\n"+newXML);
            
            alert(newXML.length());
            alert(newXML);
            for(var i=0; i< newXML.children().length; i++){
            	$.writeln(i+newXML.children()[i]);
            }


            file.close();

        }();