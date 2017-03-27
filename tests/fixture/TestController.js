O2.extendClass("flute.controller.TestController", "flute.controller.ControllerAbstract", {
	test : null,
	init : function() {
		var self = this;
		this.on('flute:globalEvent', function() {
			self.testGlobalEvent = true;
		});
		this.test = [];
	},
	testAction : function(param1, param2) {
		var self = this;
		var l = arguments.length;
		for (var i = 0; i < l; i++) {
			this.test.push(arguments[i]);
		}
	}
});
