function $(param)
{
	return document.querySelector(param);
}

function ss(param)
{
	return document.querySelectorAll(param);
}

updateLoading();

var dd = document;
var lockPage = ss(".lock-page")[0];
var doneSliding = false;
// var num_of_scripts = 3;

// loading_counter = 1;

// var imgs = ss("img");
// var arrImgs = Array.prototype.slice.call(imgs,0);
// arrImgs.forEach(function(el)
// {
// 	el.onload=function()
// 	{
// 		console.log("loaded");
// 	}
// })

function changeLockUp()
{
	lockPage.classList.add("lock-change-up");
}

function changeLockDown()
{
	lockPage.classList.add("fast-transition");
	lockPage.classList.remove("lock-change-up");
	setTimeout(function()
	{
		lockPage.classList.remove("fast-transition");
	},250)
}

function lockPageAutoSlide()
{
	if(!doneSliding)
	{
		changeLockUp();
		setTimeout(function()
		{
			changeLockDown();
		},600)
	}
}

// setInterval(function()
// {
// 	lockPageAutoSlide();
// },6000)

var unlockBtn = $("#unlock");
var aura_small = $("#aura_small");
var	aura_big = $("#aura_big");
var	aura_big2 = $("#aura_big2");
var	over2 = $("#over2");
var besu = $("#besu");
var iiest = $("#iiest");
var subMenuShown = false;
var events = $("#events");
var slideRight = ss(".sidebar-menu")[0];

function startAnim()
{
	aura_small.classList.add("anim_small_a");
	aura_big.classList.add("anim_big_a");
	aura_big2.classList.add("anim_big_b");
	over2.classList.add("anim_rot");
}

function iiestOverBesu()
{
	besu.classList.add("besu-anim");
	iiest.classList.add("iiest-anim");
}

function fixIiest()
{
	iiest.style.bottom = "-1vh";
	iiest.style.opacity = "1";
	iiest.classList.remove("iiest-anim");
}

function besu_iiest()
{
	setTimeout(function()
		{
			iiestOverBesu();
		}, 500);
	setTimeout(function()
		{
			fixIiest();
		}, 2400);
}

function removeAmimation()
{
	aura_small.classList.remove("small");
	aura_big.classList.remove("move");
	aura_big2.classList.remove("move2");
	aura_small.classList.remove("anim_small_a");
	aura_big.classList.remove("anim_big_a");
	aura_big2.classList.remove("anim_big_b");
	over2.classList.remove("anim_rot");
}

function lockPageNone()
{
	setTimeout(function()
		{
			lockPage.style.display = "none";
		}, 500);	
}

setTimeout(function(){ startAnim(); }, 700);

unlockBtn.onclick=function()
{
	window.scrollTo(0,0);
	removeAmimation();
	lockPage.classList.add("lock-page-up");
	lockPageNone();
	doneSliding = true;
	besu_iiest();
	startcanvas();
	setTimeout(function(){
		$("body").style.overflow = 'auto';	
		$("body").style.overflowX = 'hidden';		
	}, 500)
}

function showSidebarMenu () {
	slideRight.classList.add("sidebar-menu-right");
	events.setAttribute("data-hint","Hide Events List")
	subMenuShown = true;
}

function hideSidebarMenu () {
	slideRight.classList.remove("sidebar-menu-right");
	events.setAttribute("data-hint","Show Events List")
	subMenuShown = false;
}

events.onclick=function()
{
	if(!subMenuShown)
	{
		showSidebarMenu();
	}
	else
	{
		hideSidebarMenu();
	}
}

$("#main-container").onclick = function(){
	if(subMenuShown){
		hideSidebarMenu();
	}
}