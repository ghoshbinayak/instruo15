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