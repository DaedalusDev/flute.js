describe('flute.ApplicationAbstract :', function() {
	describe('Construct well', function() {
		var oApp = new flute.ApplicationAbstract();
		it('Init __controllers', function() {
			expect(oApp.__controllers).toEqual({});
		});
	});
	describe('_getController()', function() {
		var oApp = new flute.ApplicationAbstract();
		var ctrl = oApp._getController("Test");
		it('Return an instance of the controller called', function() {
			expect(ctrl).toEqual(jasmine.any(O2.loadObject('flute.controller.TestController')));
		});
		it('Return an the previous controller if recalled', function() {
			expect(oApp._getController("Test")).toBe(oApp.__controllers['TestController']);
		});
		it('Attach flute:globalEvent to every controller', function() {
			ctrl.trigger('flute:globalEvent');
			expect(ctrl.testGlobalEvent).toBe(true);
		});
		it('Throw an error if controller is not found', function() {
			expect(function() { oApp._getController("Toto"); }).toThrow("Le controlleur TotoController est introuvable");
		});
	});
});
