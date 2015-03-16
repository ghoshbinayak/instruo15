INST.sidebar = {
	sidepanel: INST.S(".sidebar-menu")[0],
	isExpanded: false,
	events: INST.s('#events'),
	init: function() {
		var that = this;
		this.events.onclick = function(){
			if(!that.isExpanded){
				that.show();
			}
			else{
				that.hide();
			}
		};

		INST.s("#main-container").onclick = function(){
			if(that.isExpanded){
				that.hide();
			}
		};
		console.log('sidebar init');
	},
	show: function() {
		this.sidepanel.classList.add("sidebar-menu-right");
		this.events.setAttribute("data-hint","Hide Events List")
		this.isExpanded = true;
	},
	hide: function(){
		this.sidepanel.classList.remove("sidebar-menu-right");
		this.events.setAttribute("data-hint","Show Events List")
		this.isExpanded = false;
	}
};

INST.sidebar.init();
// INST.sidebar = {
	
// }

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


// function showSidebarMenu () {
// 	slideRight.classList.add("sidebar-menu-right");
// 	events.setAttribute("data-hint","Hide Events List")
// 	subMenuShown = true;
// }

// function hideSidebarMenu () {
// 	slideRight.classList.remove("sidebar-menu-right");
// 	events.setAttribute("data-hint","Show Events List")
// 	subMenuShown = false;
// }

// events.onclick=function()
// {
// 	if(!subMenuShown)
// 	{
// 		showSidebarMenu();
// 	}
// 	else
// 	{
// 		hideSidebarMenu();
// 	}
// }

// INST.s("#main-container").onclick = function(){
// 	if(subMenuShown){
// 		hideSidebarMenu();
// 	}

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

// window.onkeydown = function(param){
// 	var key = ('which' in param)?param.which:param.keyCode;
// 	if(key == 13){
// 		lockpageUnlock();
// 	}
// }

// INST.s("#unlock").onclick = function(){
// 	lockpageUnlock();
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
var mapDiv = INST.S('.location-gmaps')[0];

function CenterControlMaps(controlDiv, map) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Open in Maps';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Open in Maps';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to
  // Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
    var mapsUrl = "https://www.google.co.in/maps/place/Indian+Institute+of+Engineering+Science+and+Technology,+Shibpur/@22.555862,88.305706,17z/data=!3m1!4b1!4m2!3m1!1s0x3a0279c91a8d2d49:0xc6ee508c74cf031d?hl=en"
    var win = window.open(mapsUrl, '_blank');
    win.focus();
  });

}

function initializeMaps() {
  var myLatlng = new google.maps.LatLng(22.5558,88.3057)
  var mapOptions = {
    zoom: 16,
    center: myLatlng,
    scrollwheel: false,
  };

  var map = new google.maps.Map(mapDiv,mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'IIEST Shibpur'
  });
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControlMaps(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);
}

function loadScriptMaps() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyjFcbQbCn48QHVsK-ax6Rh8lvtKHLEzk&v=3.exp&' +
  'callback=initializeMaps';
  document.body.appendChild(script);
}

loadScriptMaps();