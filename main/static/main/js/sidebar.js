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
		};
		INST.S('.all-event')[0].onclick = function(){
			INST.content.switchTo(INST.s('#all-events-page'));
			setTimeout(function() {
				INST.content.eventInit();
			}, 1000);
		};
		INST.s('#sidebar-contacts').onclick = function(){
			INST.content.switchTo(INST.s('#contacts-page'));
			setTimeout(function() {
				INST.contacts.init();
			}, 1000);
		};
		INST.s('#sidebar-sponsor').onclick = function(){
			INST.content.switchTo(INST.s('#sponsors-page'));			
		};
		INST.s('#sidebar-location').onclick = function(){
			INST.content.switchTo(INST.s('#locateus-page'));			
			setTimeout(function(){
				INST.gmap.isShown = true;
				INST.gmap.init();
			}, 1000);
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