/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

/*Prevent your local data from losing.
Don't edit if you don't get certain knowledge about this.
Might crash your Adobe host app.
*/
(function(){
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
})();




// demo function to call jsx
(function () {
	var csInterface = new CSInterface();

	'use strict';



	function init() {


		// themeManager.init();

		$("#btn_test").click(function () {
			csInterface.evalScript('sayHello()');
		});

		

	}

	init();

}());


// get path of extension
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
	return path;
};


var getFiles = function (path){
	var csInterface = new CSInterface();

	csInterface.evalScript('getFilesFromPath("' + path + '")', function(res){
		path = path.replace(/\//g,"\\");
		console.log("path: "+path);
		console.log("res: "+res);
		var resultArray = res.split(",");
		console.log(resultArray);
		$(".set-holder").empty();
		for (var i = 0; i < resultArray.length; i++) {
			

			
			var tempId = resultArray[i].replace(path+"\\","");
			var element = document.createElement("button");
			element.setAttribute('id', tempId.replace(" ",""));
			// alert(element.getAttribute('id'));
			element.setAttribute('toggle-state','0');
			element.classList.add('btn','btn-primary', 'btn-set');
			element.setAttribute('type','button');
			element.setAttribute('data-toggle','collapse');
			element.setAttribute('data-target','#collapseExample');
			element.setAttribute('aria-expanded','false');
			element.setAttribute('onClick','xxxxx('+element.getAttribute('id')+')');
			alert(element.getAttribute('id'));
			element.setAttribute('aria-controls','collapseExample');
			element.innerText = tempId;
			$('#left').append(element);

		}
	});
}
$('.btn-set').click(function(){
	alert('hello');
});
getFiles(getPathOfExtension()+"/resource/AEP");

var xxxxx= function(state){
	
	
	alert(state.getAttribute('toggle-state'));

}
// console.log(getPathOfExtension()+"/resource/AEP");

// getFiles(getPathOfExtension()+"/resource");
// get os
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
// get JSX json
// var getJSX = function(path){
// 	path += "/presets";
// 	var csInterface = new CSInterface();
// 	csInterface.evalScript('getJsxFiles("'+ path +'")', function(res){
// 		var paths = JSON.parse(res);
// 	} );
// 	setTimeout(function(){
// 		console.log(paths);
// 	}, 2000);
// }

// test button

$("#btn-test2").click(function(){
	var csInterface = new CSInterface();
	csInterface.evalScript('importAep("'+getPathOfExtension()+"/resource/AEP/Blur"+'")');
	console.log("haha"+getPathOfExtension()+"/resource/AEP/Blur");
});


