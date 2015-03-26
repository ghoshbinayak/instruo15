INST.content = {
	contentShown: false,
	switchTo: function (param) {
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

}