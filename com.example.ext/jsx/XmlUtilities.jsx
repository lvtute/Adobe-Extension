// read file
var appListLocationXml = XML("<locations></locations>");
var extensionPath = "";
var plainContent = "";
var resourceXmlFile = File();
var encoding = "UTF8";


var importListFile = function(){
  
  var b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8 = null; //thuandeptrai
  // $.sleep(2000);
  var file = new File();

  file =File.openDialog ("Please select list file", false);
  if(file==null || file.exists ==false ){
    alert("File is not exists or you didn't chose one. Please try again.",false);

  } else {

  	// file.encoding = 'utf-8';
  	// file.open('r');
  	// var content = file.read();

        //    alert("content:\n"+ content);
        
        $.evalFile(file);
        if(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8==null){
          alert("The file you imported is not our list file.\nPlease contact our developers at lvtute@gmail.com or facebook.com/lthuanv.\nAny other contacts are fake.", "Please respect our copyright.", true);
          return;
        }

        var newXML  = XMLList(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8);

            //alert("newXML\n"+newXML);
            
           // alert(newXML.length());
            //alert(newXML);
            for(var i=0; i< newXML.children().length; i++){
            	$.writeln(i+newXML.children()[i]);
            }

            xmlRoot.appendChild(newXML);
            appListLocationXml.appendChild(XML(<location>{file.fullName}</location>));
            updateResouceFile();
         
           // alert(xmlRoot.children());

            // file.close();
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

function initializeExtensionPath(path){
  extensionPath = path;
  resourceXmlFile = File(extensionPath+"/jsx/resource.properties");

  loadResourceXml();
 
}

function loadResourceXml(){
  


  // create resource.xml if it doesn't exist
  if(resourceXmlFile== null || resourceXmlFile.exists == false){
    updateResouceFile();
    alert("Your resource list is empty. Please import list file(s).","New resource file created");
  }else {
    $.evalFile(resourceXmlFile);
    // alert(plainContent);
    appListLocationXml = XML(plainContent);
    // alert(appListLocationXml);
    //alert(appListLocationXml.children().length()); 
    
  }
}
function updateResouceFile(){
  plainContent = "//Please don't modify this file\nvar plainContent ='"+appListLocationXml.toString().replace(/\r?\n|\r/g,"")+"';";
  writeFile(resourceXmlFile,plainContent, encoding);
  alert("resource.xml updated!");


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
