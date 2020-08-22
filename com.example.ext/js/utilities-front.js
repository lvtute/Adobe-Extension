function laugh (){
	alert("hahaha!");
}
var username = "lvtut";

// getOs(0, function(res){
		
// 		loadComps(res);
// 	});
// function getOs(nothing, callback){
// 	csInterfaceGlobal.evalScript('getCompsByAepName("'+aepName+'")', function(res){
// 		callback(res);
// 	});

// }
var csInterfaceGlobal = new CSInterface();
function getOS() {
	var userAgent = window.navigator.userAgent,
	platform = window.navigator.platform,
	macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
	windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	os = null;
	console.log(platform);
	if(macosPlatforms.indexOf(platform) != -1) {
		os = "MAC";
	} else if(windowsPlatforms.indexOf(platform) != -1) {
		os = "WIN";
	}
	return os;
}

// System crashes
function preventSystemCrash(){
	
	var isNS = (navigator.appName == "Netscape") ? 1 : 0;

	if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);

	function mischandler(){
		return false;
	}

	function mousehandler(e){
		var myevent = (isNS) ? e : event;
		var eventbutton = (isNS) ? myevent.which : myevent.button;
		if((eventbutton==2)||(eventbutton==3)) return false;
	}
	document.oncontextmenu = mischandler;
	document.onmousedown = mousehandler;
	document.onmouseup = mousehandler;
}


function loadAepToCollapsedPanel(id){

	console.log(id);
	element = document.getElementById(id);
	console.log(element);
	csInterfaceGlobal.evalScript('getAllAepFromSet("'+element.firstChild.innerText+'")', function(res){
		result = res.split(",");
		var buttonContainer =  document.getElementById(id.replace("panel-header","panel-body-"));
		while (buttonContainer.firstChild) {
			buttonContainer.removeChild(buttonContainer.firstChild);
		}
		var button;
		for (var i = 0; i < result.length; i++) {
			button = createAepButton(result[i], document.getElementById(id).firstChild.innerText.replace(" ",""));
			
			document.getElementById(id.replace("panel-header","panel-body-")).append(button);
		}
	});
}

function createSetHeader(setname){
	var setNameWithoutSpace = setname.replace(" ","");
	var divPanel = document.createElement("div");
	divPanel.classList.add("panel", "panel-default");
	divPanel.setAttribute("style", "margin-top:0;");
	divPanel.setAttribute("id","panel-header"+setNameWithoutSpace);
	var h4 = document.createElement("h4");
	h4.classList.add("panel-title","collapsed","panel-heading");
	h4.innerText = setname;
	h4.setAttribute("id", "h4-"+setNameWithoutSpace);
	h4.setAttribute("data-toggle", "collapse");
	h4.setAttribute("data-parent","#accordion");
	h4.setAttribute("href","#collapse"+setNameWithoutSpace);
	h4.setAttribute("aria-expanded","false");
	
	divPanel.setAttribute('onClick','loadAepToCollapsedPanel("'+divPanel.getAttribute("id")+'")');
	divPanel.append(h4);
	return divPanel;
}


function createSetCollapsePanel(setname){
	var divCollapse = document.createElement("div");
	var setNameWithoutSpace = setname.replace(" ","");
	divCollapse.setAttribute("id","collapse"+setNameWithoutSpace);
	divCollapse.classList.add("panel-collapse", "collapse");

	var divPanelBody = document.createElement("div");
	divPanelBody.classList.add("panel-body");
	// divPanelBody.innerText = setname;
	divPanelBody.setAttribute("id", "panel-body-"+setNameWithoutSpace);

	divCollapse.append(divPanelBody);
	return divCollapse;

}
function loadSets(){
	$( ".panel-group" ).empty();
	csInterfaceGlobal.evalScript('getAllSets()', function(res){
		// alert(res);
		var setsArray = res.split(",");
		var element;
		for (var i = 0; i < setsArray.length; i++) {
			element = createSetHeader(setsArray[i]);
			element2 = createSetCollapsePanel(setsArray[i]);
			element.append(element2);
			$('.panel-group').append(element);
		}
	});
}
// <button type="button" class="btn btn-info">Info</button>
function createAepButton(aep_name, set_name){

	var button = document.createElement("button");
	button.classList.add("btn","btn-info","btn"+set_name);
	button.setAttribute("type", "button");
	button.innerText= aep_name;
	button.setAttribute("id", aep_name.replace(" ","").replace(".","-"));
	button.setAttribute('onClick','onAepClick("'+button.innerText+'")');


	return button;
}
function onAepClick(aepName){
	// alert(compName);
	var nothing =0;
	doLoadComp(nothing, function(res){
		// alert("load sets again!");
		
		loadComps(res);
	});
	function doLoadComp(nothing, callback){
		csInterfaceGlobal.evalScript('getCompsByAepName("'+aepName+'")', function(res){
			callback(res);
		});
		
	}
}
function loadComps(compList){
	$( "#comp-button-panel" ).empty();
	// alert(compList);
	var compsArray = compList.split(",");
	var element;
	for (var i = 0; i < compsArray.length; i++) {
		if (compsArray[i].indexOf(".png")!=-1) {
			element = createCompImageButton(compsArray[i]);
		} else{
			element = createCompButton(compsArray[i]);

		}

		$('#comp-button-panel').append(element);
	}
}
function createCompButton(compName){
	var compButton = document.createElement("button");
	
	compName = compName.replace(/\\/g, "/");
	path = compName;
	compButton.setAttribute("path", compName);
	var lastSlash = compName.lastIndexOf("/");
	var lastDot = compName.lastIndexOf(".");
	compName = compName.slice(lastSlash+1, lastDot);
	compButton.innerText = compName;

	compButton.classList.add("btn","btn-comp");
	compButton.setAttribute("type", "button");
	compButton.setAttribute('onClick','onCompClick("'+compButton.getAttribute("path")+'")');
	compButton.setAttribute('ondblclick','onCompDoubleClick("'+path+'")');
	return compButton;
}

function createCompImageButton(compName){

	var compButton = document.createElement("img");
	compButton.setAttribute("path", compName.replace(".png",".mp4"));
	var path = compName.replace(".png",".mp4");

	path =path.replace(/\\/g, "/");

	// alert(path);
	compButton.setAttribute("src", compName);

	compButton.classList.add("btn","btn-image");

	compButton.setAttribute("type", "button");
	compButton.setAttribute('onClick','onCompClick("'+path+'")');
	compButton.setAttribute('ondblclick','onCompDoubleClick("'+path+'")');

	return compButton;
}
function onCompClick(path){
	//console.log(path);
	// alert(checkFileExists(path));
	// if (checkFileExists(path)) {
	// 	alert("File "+path+" doesn't exist. Please check again or contact us for error reporting. Thanks.");
	// 	return;
	// }
	var video = document.getElementsByTagName('video')[0];
    var sources = video.getElementsByTagName('source')[0];
    sources.src = path;

    video.load();
    video.play();

	// $("#video-source").attr("src",path);
	// console.log(checkFileExists(path));
	// console.log($("#video-source").prop("src"));
	// $("#video1").get(0).play();
}
function onCompDoubleClick(path){
	console.log(path);
	path = path.slice(path.lastIndexOf("/")+1,path.length);
	//alert(path);

	doApplyComp(nothing, function(res){
		// alert("load sets again!");
		alert(res);
	});
	function doApplyComp(nothing, callback){
		csInterfaceGlobal.evalScript('applyComp("'+path+'")', function(res){
			callback(res);
		});

	}
}

$("#btn-import").click(function(){

	var nothing = 0;
	doImport(nothing, function(res){
		// alert("load sets again!");
		loadSets();
	});
	function doImport(nothing, callback){
		csInterfaceGlobal.evalScript('importListFile()', function(res){
			callback(res);
		});

	}
	// csInterfaceGlobal.evalScript('importListFile()');
	
});

function checkFileExists(path){
	// $.ajax({
 //    url:path,
 //    type:'HEAD',
 //    error: function()
 //    {
 //        return false;
 //    },
 //    success: function()
 //    {
 //        return true;
 //    }
	// });
	$.get(path)
    .done(function() { 
        return true;
    }).fail(function() { 
        return false;
    })
}
$('video').click(function() {
				  if (this.paused == false) {
				      this.pause();
				     // alert('music paused');
				  } else {
				      this.play();
				     // alert('music playing');
				  }
				});