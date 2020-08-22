/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// #include "json2.js"
#include "utilities-back-getfiles.jsx"
#include "utilities-back-applyfiles.jsx"
#include "XmlUtilities.jsx"

var xmlRoot = XML("<root></root>");




// called when applicaiton start
// var getAllSets;
function getAllSets(){ // for front to call
	// alert("i was called");
	//alert(xmlRoot.children().text().length());
	var result = "";
	for(var i=0; i< xmlRoot.children().text().length(); i++){
		
		result+=xmlRoot.children().text()[i].toString()+",";
		//alert(result);
	}

	// return "a,b,n,gre,we,rtqwe,rqw";
	// alert(result);
	return result.slice(0,result.length-1);
}


// called when user click on a set name
function getAllAepFromSet(set_name){
	
	var result = xmlRoot.children();
	for (var i = 0; i < result.length(); i++) {
		if(result[i].text().toString()==set_name){
			result = result[i];
			break;
		}
	}


	result = result.child("aep");
	alert(result);
	var realResult = "";
	for (var i = 0; i < result.length(); i++) {
		realResult += result.text()[i].toString()+",";
	}
	realResult = realResult.slice(0, realResult.length-1);
	alert(realResult);
	return realResult;
	

}

function getCompsByAepName(aepName){
	var isImage = false;
	

	var result1="";
	var result2 = "";
	var resultxml;
	var xml = xmlRoot.descendants("aep");
	alert("xml"+xml);
	for(var i=0; i< xml.length(); i++){
		if (xml[i].text().toString()==aepName) {
			resultxml = xml[i];
			break;
		}
	}
	//alert(resultxml.child("preview"));
	for (var i =0; i< resultxml.child("preview").length(); i++){
		
		var previewXml = resultxml.child("preview")[i];
		// alert(previewXml+ previewXml.@path);
		if(File(previewXml.@path.toString().replace("mp4","png")).exists){
			result1 += resultxml.child("preview")[i].@path.toString().replace("mp4","png")+",";
			continue;
		}
		result1 += resultxml.child("preview")[i].@path.toString()+",";


	}

	result1 = result1.slice(0, result1.length-1);
	

	return result1;
}
function getPreviewFromName(name){
	var myxml = xmlRoot.descendants("preview");
	// alert(name);
	alert("myxml"+myxml[1].toString());
	for (var i = 0; i < myxml.length(); i++) {
		if (myxml[i].text().toString()==name) {
			return myxml[i];
		}
	
	}
}

  // importListFile();}
