INST.sidebar = {
	sidepanel: INST.S(".sidebar-menu")[0],
	isExpanded: false,
	events: INST.s('#sidebar-events'),
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
		INST.s("#sidebar-home").onclick = function(){
			if (INST.contentShown) {
				INST.contentShown = false;
				INST.s("body").style.overflow = 'hidden';	
				INST.S('.content-container')[0].classList.add('hide');
				INST.S('.landing-page')[0].classList.remove('hide');
				INST.wave.start();
			};
		};
		INST.S('.all-event')[0].onclick = function(){
			if (!INST.contentShown) {
				INST.wave.stop();
				INST.contentShown = true;
				INST.S('.landing-page')[0].classList.add('hide');
			};
			INST.S('.content-container')[0].classList.remove('hide');
			INST.s("body").style.overflow = 'auto';
			INST.s("body").style.overflowX = 'hidden';
			INST.S('.content-page')[0].innerHTML = INST.s('#all-events-page').innerHTML;
		};
		INST.s('#sidebar-contacts').onclick = function(){
			if (!INST.contentShown) {
				INST.wave.stop();
				INST.contentShown = true;
				INST.S('.landing-page')[0].classList.add('hide');
			};
			INST.S('.content-container')[0].classList.remove('hide');
			INST.s("body").style.overflow = 'auto';
			INST.s("body").style.overflowX = 'hidden';
			INST.S('.content-page')[0].innerHTML = INST.s('#contacts-page').innerHTML;
		};
		INST.s('#sidebar-sponsor').onclick = function(){
			if (!INST.contentShown) {
				INST.wave.stop();
				INST.contentShown = true;
				INST.S('.landing-page')[0].classList.add('hide');
			};
			INST.S('.content-container')[0].classList.remove('hide');
			INST.s("body").style.overflow = 'auto';
			INST.s("body").style.overflowX = 'hidden';
			INST.S('.content-page')[0].innerHTML = INST.s('#sponsors-page').innerHTML;
		};
		INST.s('#sidebar-location').onclick = function(){
			if (!INST.contentShown) {
				INST.wave.stop();
				INST.contentShown = true;
				INST.S('.landing-page')[0].classList.add('hide');
			};
			INST.S('.content-container')[0].classList.remove('hide');
			INST.s("body").style.overflow = 'auto';
			INST.s("body").style.overflowX = 'hidden';
			INST.S('.content-page')[0].innerHTML = INST.s('#locateus-page').innerHTML;
			INST.gmap.isShown = true;
			INST.gmap.init();
		};
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
INST.landing = {
	animateTagline: function(){
		INST.s('#tagline').classList.add('animateTagline');
		setTimeout(function(){
			INST.s('#instruo-dates').classList.add('animateDate');
		}, 2000);
	}
};

INST.wave = {
    container: INST.s('#container-canvas'),
    renderer: null,
    scene: null,
    light1: null,
    light2: null,
    geometry: null,
    material: null,
    mesh: null,
    now: Date.now(),
    start: this.now,
    xPos1: -800,
    xPos2: 0,
    running: false,
    init: function() {
		this.renderer = new FSS.CanvasRenderer();
	    this.scene = new FSS.Scene();
	    this.light1 = new FSS.Light('#2887c4', '#000000');
	    this.light2 = new FSS.Light('#2887c4', '#000001');
	    this.geometry = new FSS.Plane(INST.wave.container.offsetWidth, INST.wave.container.offsetHeight, 12, 4);
	    this.material = new FSS.Material('#2887c4', '#2887c4');
	    this.mesh = new FSS.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
		this.scene.add(this.light2);
		this.scene.add(this.light1);
		this.container.appendChild(this.renderer.element);
		window.addEventListener('resize', this.resize);
		this.running = true;
		this.animate();
    },
    resize: function() {
		INST.wave.renderer.setSize(INST.wave.container.offsetWidth, INST.wave.container.offsetHeight);
    },
    animate: function() {
		INST.wave.now = Date.now() - INST.wave.start;
		if (INST.wave.xPos1  > 1000) {
		INST.wave.xPos1 = -1000;
		}
		if (INST.wave.xPos2  > 1000) {
		INST.wave.xPos2 = -1000;
		}
		INST.wave.xPos1 += 6;
		INST.wave.xPos2 += 6;
		INST.wave.light1.setPosition(INST.wave.xPos1, -120, 60);
		INST.wave.light2.setPosition(INST.wave.xPos2, -120, 60);
		INST.wave.renderer.render(INST.wave.scene);
		if(INST.wave.running){
			requestAnimationFrame(INST.wave.animate);
		}
    },
    start: function(){
    	if (!INST.wave.running) {
	    	INST.wave.running = true;
	    	INST.wave.resize();
	    	INST.wave.animate();    		
    	};
    },
    stop: function(){
    	INST.wave.running = false;
    }
};

INST.wave.init();
INST.wave.resize();
INST.loading.update();

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
INST.gmap = {
    isLoaded: false,
    isShown: false,
    mapDiv: null,
    setup: function(controlDiv, map) {
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
        // IIEST Shibpur
        google.maps.event.addDomListener(controlUI, 'click', function() {
          var mapsUrl = "https://www.google.co.in/maps/place/Indian+Institute+of+Engineering+Science+and+Technology,+Shibpur/@22.555862,88.305706,17z/data=!3m1!4b1!4m2!3m1!1s0x3a0279c91a8d2d49:0xc6ee508c74cf031d?hl=en"
          var win = window.open(mapsUrl, '_blank');
          win.focus();
        });
    },

    init: function() {
        if(!this.isShown || !this.isLoaded){
            return;
        }
        this.mapDiv = INST.S('.location-gmaps')[0];
        var myLatlng = new google.maps.LatLng(22.5558,88.3057)
        var mapOptions = {
          zoom: 16,
          center: myLatlng,
          scrollwheel: false,
        };

        var map = new google.maps.Map(this.mapDiv,mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'IIEST Shibpur'
        });
        var centerControlDiv = document.createElement('div');
        var centerControl = new this.setup(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);
    },

    load: function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyjFcbQbCn48QHVsK-ax6Rh8lvtKHLEzk&v=3.exp&' +
        'callback=INST.gmap.init';
        this.isLoaded = true;
        document.body.appendChild(script);
    }
};

INST.gmap.load();

