function laugh (){
	alert("hahaha!");
}
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


// get path of the current Extension
var getPathOfExtension =function () {
	'use strict';
	var favsList = [];
	var favsIndices = [];
	var path, slash;
	path = location.href;
	if(getOS() == "MAC") {
		slash = "/";
		path = path.substring(0, path.length - 11);
	}
	if(getOS() == "WIN") {
		slash = "/";
		path = path.substring(8, path.length - 11);
	}
	// console.log(path);
	return path;
};

// when click on set name, will toggle/ delete then toggle the comp name list




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

function loadAepToCollapsedPanel(id){

	console.log(id);
	element = document.getElementById(id);
	console.log(element);
	csInterfaceGlobal.evalScript('getAllAepFromSet("'+element.firstChild.innerText+'")', function(res){
		result = res.split(",");

		var button;
		for (var i = 0; i < result.length; i++) {
			button = createAepButton(result[i], document.getElementById(id).firstChild.innerText.replace(" ",""));
			
			document.getElementById(id.replace("panel-header","panel-body-")).append(button);
		}
	});
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

	csInterfaceGlobal.evalScript('getAllSets()', function(res){
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

	return button;
}
