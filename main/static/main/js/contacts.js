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
				console.log("dguit");
			});
			this.details_shown = false;		
		}		
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
				// var minImg = INST.S(".contacts-min-img");

				if(!that.details_shown) {		
					setTimeout(function()
					{
						// var minImg = INST.S(".contacts-min-img");

						that.details_shown = true;
					},1);
				}
			}
		});
		INST.s("#main-container").onclick = function(){
			that.hide();
			console.log('called');
		};
	}
}
