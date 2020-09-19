             var packageFolder;
            var listFile;
   
             
     var createFile = function(){

   
          
            
            packageFolder = Folder.selectDialog();
          
            
            if(!File(packageFolder.fullName+"/Preview").exists){
                alert ("The chosen folder is not a valid package folder, please try again", "Import failed", true);
                
            }
         listFile =  File(packageFolder.fullName+"/"+File.decode(packageFolder.name)+".list");
            var temp = makeTag("package");

            var myRoot = temp;
   
            for(var i=0;i<packageFolder.getFiles().length;i++){
                $.writeln(i);
                    if(isValidSet(packageFolder.getFiles()[i].name)){
                            var setFolder = File(packageFolder.getFiles()[i].fullName);
                            if(!(setFolder instanceof Folder)){
                                    continue;
                                }
                           
                            var previewFolderPath = (setFolder.parent.fullName+"/Preview/"+File.decode(setFolder.name));
                            var previewFolderObj  = Folder(previewFolderPath);
                 
                            var setElement = makeTag("set",File.decode(setFolder.name));
                            for(var j=0; j<setFolder.getFiles().length;j++){
                                var aepFile = setFolder.getFiles()[j].name;
                                
                                    if(isValidFileName(aepFile, ".aep","")){
                                        aepElement = makeTag("aep",aepFile);
                                         
                                          for (var k=0; k< previewFolderObj.getFiles().length; k++){
                                              var previewName =   File.decode(previewFolderObj.getFiles()[k].name);
//~                                               alert("previewName: "+previewName);
                                            
                                              
                                              var prefix = File.decode(aepFile.replace(".aep", ""));
                                           //     alert("previewName: "+previewName+"\nprefix: "+prefix);
                                              if(isValidFileName(previewName, prefix, ".mp4")){
                                                 $.writeln(File.decode(previewFolderObj.getFiles()[k].fsName));
                                                        var previewElement = makePreviewTag(previewName,previewFolderObj.getFiles()[k].name);
                                                        aepElement.appendChild(previewElement);
                                                  }
                                                
                                              }
                                        
                                           setElement.appendChild(aepElement);
                                          //alert(prefix);
                                        }          
                                }
                            myRoot.appendChild(setElement);
                        }
                }
            
     //create file

         
            var fileContent, encoding;
            var encoding = "UTF-8";
            
            fileContent = "var b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8 ='"+myRoot.toString().replace(/\r?\n|\r/g,"")+"';";
            fileContent = fileContent.replace("<package>","");
            fileContent = fileContent.replace("</package>","");
            
            writeFile (listFile, fileContent, encoding);
           
         };
createFile ();

           // read file
           var readFile = function(){
                 var file =File.openDialog ("D m m dam bao chon folder di", false);
                 
                 file.encoding = 'utf-8';
                file.open('r');
                var content = file.read();
               
            //    alert("content:\n"+ content);
                $.evalFile(file);
       
                var newXML  = XMLList(b24f6aad44c60b4d37abf90dc3a0d80e577d79a20d823324bd140d4f257815a8);
                
                //alert("newXML\n"+newXML);
                
                alert(newXML.length());
                  alert(newXML);
                for(var i=0; i< newXML.children().length; i++){
                        $.writeln(i+newXML.children()[i]);
                    }


                file.close();
      
               }();
           
         
   //  alert(myRoot);
     

//===================================================================
// support functions section
function isValidSet(name){
        if(name.indexOf ("(")!=-1 
            || name.indexOf (")")!=-1
            || name.indexOf ("Preview")!=-1){
                    return false;
                }
            
         return true;
    }

function isValidFileName(name, prefix, postfix){
        if (name.indexOf(prefix)!=-1 && name.indexOf(postfix)!=-1){
            return true;
    }
    return false;
}
function makePreviewTag(text, previewPath){
         return <preview >{text}</preview>;
    }
function makeTag (tagname, text) {
    if(tagname =="set"){
        var packageName  = File.decode(packageFolder.name);
        //File.absoluteURI
        return <{tagname} >{text}</{tagname}>;
        }
    else if(tagname =="package"){
            return  <{tagname} ></{tagname}>;
        }

    return <{tagname} >{text}</{tagname}>;
}

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
