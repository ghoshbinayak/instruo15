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