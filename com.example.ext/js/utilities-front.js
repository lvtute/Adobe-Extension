function laugh (){
	alert("hahaha!");
}

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
var setOnClick= function(element){
	
	alert(element.innerText);
	if (element.getAttribute('toggle-state')==0) {
			element.setAttribute('toggle-state','1');
		$('.card.card-body.collapse').remove();
	
		var e = document.createElement("div");
		e.setAttribute('id',"collapseExample");
		e.classList.add('card','card-body','collapse');
	
		var e2 = document.createElement("button");
		e2.classList.add('btn','button5');
		e2.innerText="test";
		e.append(e2);
		$('#'+element.getAttribute('id')).after(e);
	}else{
		element.setAttribute('toggle-state','0');
	}
}

// load package from path
function loadPackFromPath(path){
	var csInterface = new CSInterface();
	// "' + path + '"
	csInterface.evalScript('getAllSets()', function(res){
		

		var resultArray = res.split(",");
		
		$(".set-holder").empty();
		for (var i = 0; i < resultArray.length; i++) {
			
			var tempId = resultArray[i];
			var element = document.createElement("button");
			// alert(tempId.replace(" ",""));
			element.setAttribute('id', "set"+tempId.replace(" ",""));
			// alert(element.getAttribute('id'));
			// element.setAttribute('toggle-state','0');
			element.setAttribute('pos',i);
			element.classList.add('btn','btn-primary');
			element.setAttribute('type','button');
			element.setAttribute('toggle-state','0');
			element.setAttribute('data-toggle','collapse');
			element.setAttribute('data-target','#collapseExample');
			element.setAttribute('aria-expanded','false');
			// element.setAttribute('onClick','xxxxx("haha")');
			element.setAttribute('onClick','setOnClick('+element.getAttribute("id")+')');

			// console.log("element "+i+"("+tempId+")"+" has been given an onClcik");
			// console.log(element);
			element.setAttribute('aria-controls','collapseExample');
			element.innerText = tempId;
			$('#left').append(element);

		}
	});
}