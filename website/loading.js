loading_counter = 1;
var loadingMaxWidth = 20;
var num_of_scripts = 4;
console.log("loading");
var imgs = document.getElementsByTagName("img");
var arrImgs = Array.prototype.slice.call(imgs,0);
for(var iii = 0; iii < arrImgs.length; iii++)
{
	arrImgs[iii].onload=function()
	{
		console.log("loaded");
		updateLoading();
	}
	arrImgs[iii].src = (iii+1) + ".png"
}
function updateLoading()
{
	loading_counter++;
	var loadWidth = loading_counter/(num_of_scripts + arrImgs.length);
	var loadPhysicalWidth = loadingMaxWidth*loadWidth;
	var loader = document.getElementById("loading-pre-cont");
	loader.style.width = loadPhysicalWidth + "vw";
}