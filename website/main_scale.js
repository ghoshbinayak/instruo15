var dd = document;
var lockPage = dd.getElementsByClassName("lock-page")[0];
var doneSliding = false;
// $=dd.querySelectorAll;
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

var unlockBtn = dd.getElementById("unlock");
var aura_small = dd.getElementById("aura_small");
var	aura_big = dd.getElementById("aura_big");
var	aura_big2 = dd.getElementById("aura_big2");
var	over2 = dd.getElementById("over2");

function startAnim()
{
	aura_small.classList.add("anim_small_a");
	aura_big.classList.add("anim_big_a");
	aura_big2.classList.add("anim_big_b");
	over2.classList.add("anim_rot");
}

setTimeout(function(){ startAnim(); }, 700);

unlockBtn.onclick=function()
{
	aura_small.classList.remove("small");
	aura_big.classList.remove("move");
	aura_big2.classList.remove("move2");
	aura_small.classList.remove("anim_small_a");
	aura_big.classList.remove("anim_big_a");
	aura_big2.classList.remove("anim_big_b");
	over2.classList.remove("anim_rot");
	lockPage.classList.add("lock-page-up");
	doneSliding = true;
}

var eventList = false;
var events = dd.getElementById("events");
events.onclick=function()
{
	var slideRight = dd.getElementsByClassName("sidebar-menu")[0];
	if(!eventList)
	{
		slideRight.classList.add("sidebar-menu-right");
		events.setAttribute("data-hint","Hide Events List")
		eventList = true;
	}
	else
	{
		slideRight.classList.remove("sidebar-menu-right");
		events.setAttribute("data-hint","Show Events List")
		eventList = false;
	}
}