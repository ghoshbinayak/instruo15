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