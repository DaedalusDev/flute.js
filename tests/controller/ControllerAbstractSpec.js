describe('flute.controller.ControllerAbstract :', function() {
	describe('Construct well', function() {
		var testConfig = {'config':'test'};
		var oApp = new flute.controller.ControllerAbstract(testConfig);
		it('Init __appConfig', function() {
			expect(oApp.__appConfig).toEqual(testConfig);
		});
	});
	describe('getAction()', function() {
		var oCtrl = new flute.controller.TestController();
		var param = ["test","call"];
		var mth = oCtrl.getAction("test",param);
		it('Call the action and bind args', function() {
			expect(oCtrl.test).toEqual(param);
		});
		it('Throw an error if action not exist is not found', function() {
			expect(function() { oCtrl.getAction("toto"); }).toThrow("Le controlleur ne dispose pas d'une action toto");
		});
	});
});
