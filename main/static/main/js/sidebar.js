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