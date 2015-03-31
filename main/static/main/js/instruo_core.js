/* Define the INST (instruo) namespace */

INST = {
	contentShown: false,
	s: function(param){
		return document.querySelector(param);
	},
	S: function(param){
		return document.querySelectorAll(param);
	},
	jscroll: function(to){
		$('html,body').animate({
          scrollTop: (to - window.innerHeight + 100)
        }, 1000);
	}
};


INST.loading = {
	counter: 1,
	maxWidth: 20,
	numScripts: 0,
	imgs: null,
	arrImgs: null,
	loader: null,
	unlockBtn: null,
	aura_small: null,
	aura_big: null,
	aura_big2: null,
	over2: null,
	lockPage: null,
	isComplete: false,
	logo: null,
	init: function(){
		var that = this;
		this.aura_small = INST.s("#aura_small");
		this.aura_big = INST.s("#aura_big");
		this.aura_big2 = INST.s("#aura_big2");
		this.over2 = INST.s("#over2");
		this.imgs =INST.S("img");
		this.arrImgs = Array.prototype.slice.call(this.imgs,0);
		this.loader = INST.s("#loading-pre-cont");
		this.unlockBtn = INST.s("#unlock");
		this.lockPage = INST.s("#lock-page");
		this.logo = INST.s("#big-i");
		for(var iii = 0; iii < this.arrImgs.length; iii++)
		{
			this.arrImgs[iii].onload = function() {
				that.update();
			}
		}
		this.startAnim();
		this.unlockBtn.onclick = function(){
			that.unlock();
		};
		this.logo.onclick = function(){
			that.unlock();
		};
		window.onkeydown = function(param){
			var key = ('which' in param)?param.which:param.keyCode;
			if(key == 13){
				that.unlock();
			}
		};
	},
	update: function() {
		var that = this;
		this.counter++;
		var loadWidth = this.counter/(this.numScripts + this.arrImgs.length);
		var loadPhysicalWidth = this.maxWidth*loadWidth;
		if (loadWidth > .60)
		{
			loadWidth = 1;
			loadPhysicalWidth = this.maxWidth*loadWidth;
			this.loader.style.width = loadPhysicalWidth + "vw";
			setTimeout(function()
				{
					INST.s("#loading-pre").style.display="none";
					that.toggleExplore();
					that.isComplete = true;
				}, 500)
		};
		this.loader.style.width = loadPhysicalWidth + "vw";
	},
	toggleExplore: function() {
		this.loader.classList.add("loading-hidden");
		setTimeout(function()
				{
					INST.s("#unlock").style.display="block";
					INST.s("#loading-pre-cont").style.display="none";
					INST.s("#big-i").style.cursor="pointer";
				}, 500)
		console.log('toggleExplore called');
	},
	startAnim: function() {
		this.aura_small.classList.add("anim_small_a");
		this.aura_big.classList.add("anim_big_a");
		this.aura_big2.classList.add("anim_big_b");
		this.over2.classList.add("anim_rot");
		console.log('startAnim called');
	},
	removeAmimation: function(){
		aura_small.classList.remove("small");
		aura_big.classList.remove("move");
		aura_big2.classList.remove("move2");
		aura_small.classList.remove("anim_small_a");
		aura_big.classList.remove("anim_big_a");
		aura_big2.classList.remove("anim_big_b");
		over2.classList.remove("anim_rot");
		console.log('removeAmimation called');
	},
	lockPageNone: function() {
		var that = this;
		setTimeout(function(){
				that.lockPage.style.display = "none";
			}, 500);
		console.log('lockPageNone called');
	},
	unlock: function() {
		if(!this.isComplete){
			return;
		};
		window.scrollTo(0,0);
		this.removeAmimation();
		this.lockPage.classList.add("lock-page-up");
		this.lockPageNone();
		// besu_iiest();
		// startcanvas();
		setTimeout(function(){
			INST.s("body").style.overflow = 'hidden';	
			INST.s("body").style.overflowX = 'hidden';
			// animateTagline();		
		}, 500);
		INST.landing.animateTagline();
		INST.wave.init();
		INST.wave.resize();
		console.log('unlock called');
	}
};


