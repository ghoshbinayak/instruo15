/* Define the INST (instruo) namespace */

INST = {
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

