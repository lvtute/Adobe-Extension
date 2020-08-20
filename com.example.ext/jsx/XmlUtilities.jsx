// read file
  var importListFile = function(){
  	var file =File.openDialog ("Please select list file", false);

  	// file.encoding = 'utf-8';
  	// file.open('r');
  	// var content = file.read();

        //    alert("content:\n"+ content);
        $.evalFile(file);

        var newXML  = XMLList(x);

            //alert("newXML\n"+newXML);
            
           // alert(newXML.length());
            //alert(newXML);
            for(var i=0; i< newXML.children().length; i++){
            	$.writeln(i+newXML.children()[i]);
            }

            xmlRoot.appendChild(newXML);
            xmlRoot.appendChild(newXML);
            alert(xmlRoot.children().length());
            // file.close();

        };