// var unlockBtn = INST.s("#unlock");
// var aura_small = INST.s("#aura_small");
// var	aura_big = INST.s("#aura_big");
// var	aura_big2 = INST.s("#aura_big2");
// var	over2 = INST.s("#over2");
// var subMenuShown = false;
// var events = INST.s("#events");
// var slideRight = INST.S(".sidebar-menu")[0];
// var contactDetailShown = false;
// var minImg = INST.S(".contacts-min-img");
// minImg = Array.prototype.slice.call(minImg,0);




// 	if(contactDetailShown){
// 		minImg.forEach(function(el){
// 			var parent = el.parentElement;
// 			var children = parent.children;
// 			children[0].classList.remove("contacts-detail-shown");
// 			children[2].classList.remove("contacts-min-hidden");
// 			children[1].classList.remove("contacts-min-img-small");
// 			console.log("dguit");
// 		});
// 		contactDetailShown = false;		
// 	}
// }



// function animateTagline(){
// 	INST.s('#tagline').classList.add('animateTagline');
// }

// INST.s(".all-event").onclick = function()
// {
// 	smoothScrollTo(INST.s(".events").getBoundingClientRect().top);
// }

// // var scrollSteps = 60;

// function scrollActually(count, pxsToMove)
// {
// 	var stepSize = 10;
// 	var sign = Math.abs(pxsToMove)/pxsToMove;
// 	if (Math.abs(pxsToMove) > stepSize)
// 	{
// 		console.log(count);
// 		window.scrollTo(0, Math.abs(INST.s('body').getBoundingClientRect().top) + stepSize*sign);
// 		count++;
// 		setTimeout(function()
// 			{
// 				scrollActually(count, pxsToMove - sign*stepSize);
// 			}, 1);
// 	}
// 	else
// 	{
// 		window.scrollTo(0, Math.abs(INST.s('body').getBoundingClientRect().top)+pxsToMove);
// 	}
// }



// function smoothScrollTo(pxToMove)
// {
// 	// stopAnim();
// 	var currPos = Math.abs(INST.s('body').getBoundingClientRect().top);
// 	// var stepsInPx = pxToMove/scrollSteps;
// 	scrollActually(0, pxToMove);
// }

// INST.s('.all-event').onclick = function(){
// 	smoothScrollTo(INST.s('.events-container').getBoundingClientRect().top);
// }

// INST.s('#home').onclick = function(){
// 	smoothScrollTo(INST.s('body').getBoundingClientRect().top);
// }

// INST.s('#sidebar-location').onclick = function(){
// 	smoothScrollTo(INST.s('.location-container').getBoundingClientRect().top);
// }

// INST.s('#sidebar-contacts').onclick = function(){
// 	smoothScrollTo(INST.s('.contacts-container').getBoundingClientRect().top);
// }

// INST.s('#sidebar-sponsors').onclick = function(){
// 	smoothScrollTo(INST.s('.sponsors-container').getBoundingClientRect().top);
// }



// // var canvasContainer = INST.s(".container-canvas");
// var percentScrolled=0;
// document.onscroll = function(){
// 	percentScrolled = - INST.s('body').getBoundingClientRect().top/window.innerHeight;
// 	if(percentScrolled >= .01)
// 	{
// 		stopAnim();
// 	}
// 	else
// 	{
// 		startcanvas();
// 	}
// 	if(percentScrolled <= 1)
// 	{
// 		// percentScrolled = (percentScrolled > 1)?1:percentScrolled;
// 		INST.s("canvas").style.opacity=""+(1-percentScrolled);
// 		// console.log("scrolled to "+ percentScrolled);
// 	}
// 	else {
// 		INST.s("canvas").style.opacity="0";
// 	}
// }


// minImg.forEach(function(el){
// 	el.onclick = function(){
// 		var parent = el.parentElement;
// 		var children = parent.children;
// 		children[0].classList.add("contacts-detail-shown");
// 		children[2].classList.add("contacts-min-hidden");
// 		children[1].classList.add("contacts-min-img-small");
// 		if(!contactDetailShown) {		
// 			setTimeout(function()
// 			{
// 				// console.log("blue");
// 				contactDetailShown = true;
// 			},1);
// 		}
// 	}
// });