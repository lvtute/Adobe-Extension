/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

/*Prevent your local data from losing.
Don't edit if you don't get certain knowledge about this.
Might crash your Adobe host app.
*/


// preventSystemCrash();

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

loadSets();
// load the packages (on the left panel)
// loadPackFromPath();



$("#btn-test2").click(function(){
	var csInterface = new CSInterface();
	csInterface.evalScript('importAep("'+getPathOfExtension()+"/resource/AEP/Blur"+'")');
	// console.log("haha"+getPathOfExtension()+"/resource/AEP/Blur");
});


