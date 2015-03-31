INST.content = {
	contentShown: false,
	infoShown: false,
	switchTo: function (param) {
		if(this.infoShown){
			$('#info-area').fadeOut('fast');
			this.infoShown = false;
		};
		if (this.contentShown) {
			if (param === 'home') {
				this.contentShown = false;
				$('.content-container').fadeOut("normal", function(){
					$('.landing-page').fadeIn();
					INST.wave.start();
				});
			}
			else {
				$('.content-container').fadeOut("normal", function(){
					INST.S('.content-page')[0].innerHTML = param.innerHTML;
					$('.content-container').fadeIn("normal");
					INST.s("body").style.overflow = 'auto';
					INST.s("body").style.overflowX = 'hidden';
				});				
			}
		}
		else {
			if (param === 'home') {
				return;
			};
			INST.wave.stop();
			this.contentShown = true;
			$('.landing-page').fadeOut("fast", function(){
				INST.S('.content-page')[0].innerHTML = param.innerHTML;
				$('.content-container').fadeIn("fast");
				INST.s("body").style.overflow = 'auto';
				INST.s("body").style.overflowX = 'hidden';
			});
		};
	},
	eventInit: function (){
		var that = this;
		var evCont = INST.S(".eventlist-elem-wrapper");
		evCont = Array.prototype.slice.call(evCont,0);
		evCont.forEach(function(el){
			el.onclick = function(){
				var children = el.children;
				INST.content.showEvInfo(children[4].innerHTML);
			}
		});
		console.log('event init');
	},
	showEvInfo: function (content){
		if (!this.infoShown) {
			this.infoShown = true;
			var scroll = window.scrollY;
			var infoa = $('#info-area');
			$('.content-container').fadeOut();
			infoa.fadeIn();
			INST.s('#info-container').innerHTML = content;
			INST.s('#close-info-area').onclick = function(){
				$('.content-container').fadeIn();
				infoa.fadeOut();
				INST.content.infoShown = false;
				window.scrollTo(0, scroll);
			}
		}
	}
}
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
			INST.content.switchTo('home');
			window.location.href = "#home";
		};
		INST.s('#sidebar-contacts').onclick = function(){
			INST.content.switchTo(INST.s('#contacts-page'));
			setTimeout(function() {
				INST.contacts.init();
				window.location.href = "#contacts";
			}, 1000);
		};
		INST.s('#sidebar-sponsor').onclick = function(){
			INST.content.switchTo(INST.s('#sponsors-page'));
			window.location.href = "#sponsors";
		};
		INST.s('#sidebar-location').onclick = function(){
			INST.content.switchTo(INST.s('#locateus-page'));			
			setTimeout(function(){
				INST.gmap.isShown = true;
				INST.gmap.init();
			}, 1000);
			window.location.href = "#location";

		};
		// menulist event handler
		var menuitems = INST.s("#sidebar-menu-items").children;
		menuitems = Array.prototype.slice.call(menuitems,0);
		menuitems.forEach(function(el){
			el.onclick = function(){
				INST.content.switchTo(INST.s('#all-events-page'));
				setTimeout(function() {
					window.location.href = "" + el.dataset.target;
					INST.content.eventInit();
				}, 1000);

			};
		});
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
INST.contacts = {
	details_shown: false,
	minImg: null,
	hide: function(){
		if(this.details_shown){
			this.minImg.forEach(function(el){
				var parent = el.parentElement;
				var children = parent.children;
				children[0].classList.remove("contacts-detail-shown");
				children[2].classList.remove("contacts-min-hidden");
				children[1].classList.remove("contacts-min-img-small");
			});
			this.details_shown = false;		
		}		
		console.log('shown');
	},
	init: function(){
		var that = this;
		var minImg = INST.S(".contacts-min-img");
		this.minImg = Array.prototype.slice.call(minImg,0);
		this.minImg.forEach(function(el){
			el.onclick = function(){
				var parent = el.parentElement;
				var children = parent.children;
				children[0].classList.add("contacts-detail-shown");
				children[2].classList.add("contacts-min-hidden");
				children[1].classList.add("contacts-min-img-small");

				if(!that.details_shown) {		
					setTimeout(function()
					{
						that.details_shown = true;
					},1);
				}
			}
		});
		var maxImg = INST.S(".contacts-member");
		maxImg = Array.prototype.slice.call(maxImg,0);
		maxImg.forEach(function(el){
			el.onclick = function(){
				that.hide();
			}
		});
	}
}

INST.loading.update();
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

