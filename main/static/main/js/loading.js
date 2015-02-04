loading_counter = 1;
var loadingMaxWidth = 20;
var num_of_scripts = 4;
function $(param)
{
	return document.querySelector(param);
}
function ss(param)
{
	return document.querySelectorAll(param);
}
var imgs = ss("img");
var arrImgs = Array.prototype.slice.call(imgs,0);
for(var iii = 0; iii < arrImgs.length; iii++)
{
	arrImgs[iii].onload=function()
	{
		console.log("loaded");
		updateLoading();
	}
	// arrImgs[iii].src = (iii+1) + ".png"
}
var loader = $("#loading-pre-cont");
function updateLoading()
{
	loading_counter++;
	var loadWidth = loading_counter/(num_of_scripts + arrImgs.length);
	var loadPhysicalWidth = loadingMaxWidth*loadWidth;
	if (loadWidth > .97)
	{
		loadWidth = 1;
		loadPhysicalWidth = loadingMaxWidth*loadWidth;
		loader.style.width = loadPhysicalWidth + "vw";
		setTimeout(function()
			{
				$("#loading-pre").style.display="none";
				toggleExplore();
			}, 500)
	};
	loader.style.width = loadPhysicalWidth + "vw";
}

function toggleExplore()
{
	loader.classList.add("loading-hidden");
	setTimeout(function()
			{
				$("#unlock").style.display="block";
				$("#loading-pre-cont").style.display="none";
			}, 500)
}