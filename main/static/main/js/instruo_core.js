/* Define the INST (instruo) namespace */

INST = {
	doc: document,
	s: function(param){
		return this.doc.querySelector(param);
	},
	S: function(param){
		return this.doc.querySelectorAll(param);
	}
};


INST['loading'] = {
	counter: 1,
	maxWidth: 20,
	numScripts: 4,
	imgs: null,
	arrImgs: null,
	loader: null,
	init: function(){
		this.imgs =INST.S("img");
		this.arrImgs = Array.prototype.slice.call(this.imgs,0);
		this.loader = INST.s("#loading-pre-cont");

		for(var iii = 0; iii < this.arrImgs.length; iii++)
		{
			this.arrImgs[iii].onload = function() {
				console.log("loaded");
				this.update();
			}
		}
		console.log(this.arrImgs);
	},
	update: function() {
		this.counter++;
		var loadWidth = this.counter/(this.numScripts + this.arrImgs.length);
		var loadPhysicalWidth = loadingMaxWidth*loadWidth;
		if (loadWidth > .97)
		{
			loadWidth = 1;
			loadPhysicalWidth = loadingMaxWidth*loadWidth;
			this.loader.style.width = loadPhysicalWidth + "vw";
			setTimeout(function()
				{
					INST.s("#loading-pre").style.display="none";
					this.toggleExplore();
				}, 500)
		};
		this.loader.style.width = loadPhysicalWidth + "vw";
		console.log("here1");
	},
	toggleExplore: function() {
		this.loader.classList.add("loading-hidden");
		setTimeout(function()
				{
					INST.s("#unlock").style.display="block";
					INST.s("#loading-pre-cont").style.display="none";
				}, 500)
	}
}


