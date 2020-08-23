// read file
var appListLocationXml = XML("<locations></locations>");
// alert(appListLocationXml.toXMLString());
// appListLocationXml.appendChild(location);
// alert(appListLocationXml.toXMLString());

var extensionPath = "";
var plainContent = "";
var plainX="";
var resourceXmlFile = File();
var encoding = "UTF8";
// alert(appListLocationXml.toXMLString());
// (function(){
//  alert(appListLocationXml.toXMLString());
// })

var importListFile = function(){
  var b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8 = null; //thuandeptrai
  // $.sleep(2000);
  var file = new File();

  file =File.openDialog ("Please select list file", false);
  if(file==null || file.exists ==false ){
    alert("File is not exists or you didn't chose one. Please try again.",false);

  } else {

    $.evalFile(file);
    if(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8==null){
      alert("The file you imported is not our list file.\nPlease contact our developers at lvtute@gmail.com or facebook.com/lthuanv.\nAny other contacts are fake.", "Please respect our copyright.", true);
      return;
    }

    // append new imported list to xmlroot
    var newXML  = XMLList(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8);
    xmlRoot.appendChild(newXML);
    // alert(newXML);
    for(var i=0; i< xmlRoot.children("set").length();i++){
      xmlRoot.children("set")[i].@path = file.parent;
    }
    // alert(xmlRoot.child("set").length());
    // alert(xmlRoot);
    // append new imported list location to applistlocationxml then update the file
    var newLocation = new XML(<location>{file.fullName}</location>);
    appListLocationXml.appendChild(newLocation);

    alert("concac"+appListLocationXml.toXMLString());
    // alert(appListLocationXml.toXMLString());
    updateResouceFile();
    // alert(xmlRoot.children().length());


  }

};
function writeFile(fileObj, fileContent, encoding) {

  encoding = encoding || "utf-8";

  fileObj = (fileObj instanceof File) ? fileObj : new File(fileObj);

  var parentFolder = fileObj.parent;

  if (!parentFolder.exists && !parentFolder.create())

    throw new Error("Cannot create file in path " + fileObj.fsName);

  fileObj.encoding = encoding;

  fileObj.open("w");

  fileObj.write(fileContent);

  fileObj.close();

  return fileObj;

}
/**
starter function
*/
function initializeExtensionPath(path){
// alert("initializeExtensionPath was called!");
  extensionPath = path;
  resourceXmlFile = File(extensionPath+"/jsx/resource.properties");

  loadResourceXml();
  loadXmlRoot();
  // alert(appListLocationXml);
  //alert(xmlRoot.children().length());

  // alert(xmlRoot.children().text().length());
 // alert(xmlRoot);
  return true;
 
}



function loadResourceXml(){
  // create resource.xml if it doesn't exist
  if(resourceXmlFile== null || resourceXmlFile.exists == false){
    updateResouceFile();
    alert("Your resource list is empty. Please import list file(s).","New resource file created");
  }else {
// alert(appListLocationXml.toXMLString());

reloadAppListLocationXml();
}
// alert(appListLocationXml.toXMLString());

}
function loadXmlRoot(){


  //alert(appListLocationXml.toXMLString());
  var childElement;
  for (var i = 0; i < appListLocationXml.children().length(); i++) {
    childElement = appListLocationXml.children()[i];
    //alert(typeof childElement);
    var listFile = File(childElement);
    if(listFile.exists){
     $.evalFile(listFile);
     var newXML  = XMLList(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8);
     // for (var i = 0; i < newXML.children().length(); i++) {
     //  alert(i);
     //  newXML.children()[i].@path = listFile.parent;
     //        alert(newXML.children()[i]);
     // }
    

     xmlRoot.appendChild(newXML);
     

   }
   for(var x =0; x < xmlRoot.child("set").length();x++){
        xmlRoot.child("set")[x].@path = listFile.parent;
     }
     // alert(xmlRoot);

 }



}
function reloadAppListLocationXml(){
  // this mf
  $.evalFile(resourceXmlFile);
  // alert(appListLocationXml);
  // alert(plainX);
 
  appListLocationXml= XML("<locations></locations>").appendChild(XML(plainX).children());
 // alert(appListLocationXml);
}
function updateResouceFile(){
  plainContent = "//Please don't ever edit this file\n//If you got any problem, please try press the Reset button or contact our developer at lvtute@gmail.com\nvar plainX ='"+appListLocationXml.toString().replace(/\r?\n|\r/g,"")+"';";
  writeFile(resourceXmlFile,plainContent, encoding);
  reloadAppListLocationXml();
  alert("Resource updated!");
}

function isSecurityPrefSet(){
  try {
    var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
    return (securitySetting == 1);
  } catch(err){
    alert("Error in isSecurityPrefSet function\n" + err.toString());
  }
}

if (!(isSecurityPrefSet())) {
  alert("This script requires access to write files.\n" +
    "Go to the \"General\" panel of the application preferences and make sure\n" +
    "\"Allow Scripts to Write Files and Access Network\" is checked.");
  app.executeCommand(2359);
}
function resetResourceList(){
  var bool = confirm("Do you want to RESET the resources list?",true,"Resources reset confirmation");
  if (bool) {
    // appListLocationXml = XML("<locations></locations>");
    xmlRoot = XML("<root></root>");
    // alert(resourceXmlFile.remove());  
    resourceXmlFile.remove();
    appListLocationXml = XML("<locations></locations>")
    }
 

  return "OK";
}