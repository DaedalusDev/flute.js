describe('Flute jqueryAddons :', function() {
    describe('String.prototype.lowFirst()', function() {
        it('Transform String first letter to lowercase', function() {
            var s = 'Test';
            s = s.lowFirst();
            expect(s).toBe('test');
        });
    });
    describe('String.prototype.ucFirst()', function() {
        it('Transform String first letter to uppercase', function() {
            var s = 'test';
            s = s.ucFirst();
            expect(s).toBe('Test');
        });
    });
    describe('$.fn.serializeObject()', function() {
        it('Return a serialized form in object notation', function() {
            var oExpected = { text: '5', checkbox: [ '1', '2' ], select: 'val', te: [ undefined, '5' ] };
            expect($formTest.serializeObject()).toEqual(oExpected);
        });
    });
    describe('$.fn.replaceHtml()', function() {
        it('Replace the html without .remove()', function() {
            var click = 0;
            var $testWrapper = $('<div>').appendTo('body');
            var $test = $('<div>')
                .on('click', function() {
                    click++;
                })
                .appendTo($testWrapper);
            $test.click();
            expect(click).toEqual(1);

            $testWrapper.replaceHtml('<div>Bla bla</div>');
            $testWrapper.append($test);
            $test.click();
            expect(click).toEqual(2);

            $testWrapper.html('<div>Bla bla</div>');
            $testWrapper.append($test);
            $test.click();
            expect(click).toEqual(2);
        });
    });
});
