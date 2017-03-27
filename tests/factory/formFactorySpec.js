describe('flute.factory.formFactory :', function() {
	describe('applatirTableau()', function() {
		it('Return an object', function() {
			expect(flute.factory.formFactory.applatirTableau()).toEqual({});
		}); 
		it('Return form description object', function() {
			var o = $formTest.serializeObject();
			expect(flute.factory.formFactory.applatirTableau(o)).toEqual({ "text": '5', "checkbox[0]": '1', "checkbox[1]": '2', "select": 'val', "te[1]": '5' });
		});
		it('Return null if xTableau is null', function() {
			expect(flute.factory.formFactory.applatirTableau(null)).toEqual({ "": null });
		}); 
	});
});
