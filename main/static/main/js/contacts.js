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
