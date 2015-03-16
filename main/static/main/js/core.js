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

