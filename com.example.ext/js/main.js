/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

/*Prevent your local data from losing.
Don't edit if you don't get certain knowledge about this.
Might crash your Adobe host app.
*/
laugh();
lololol
preventSystemCrash();

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

// load the packages (on the left panel)
loadPackFromPath(getPathOfExtension()+"/resource/AEP");

var xxxxx= function(element){
	// alert(element.getAttribute('aria-expanded'));

	// console.log(element.innerText + " "+ element.getAttribute('aria-expanded'));
	if (element.getAttribute('toggle-state')==0) {
			element.setAttribute('toggle-state','1');
		$('.card.card-body.collapse').remove();
		
		// element.setAttribute('aria-expanded',"true");
		var e = document.createElement("div");
		e.setAttribute('id',"collapseExample");
		e.classList.add('card','card-body','collapse');
		// e.innerText="haha";
		var e2 = document.createElement("button");
		e2.classList.add('btn','button5');
		e2.innerText="test";
		e.append(e2);


		$('#'+element.getAttribute('id')).after(e);
	}else{
		element.setAttribute('toggle-state','0');
	}
	

	// console.log($('#'+element.getAttribute('id')).parent());
	// alert(element);
}
// console.log(getPathOfExtension()+"/resource/AEP");

// getFiles(getPathOfExtension()+"/resource");

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


