(function($) {
	$formTest = $('<form>');
	// Text
	$formTest.append('<input type="text" value="5" name="text" />');
	// Multicheckbox
	$formTest.append('<input type="checkbox" checked name="checkbox[]" value="1" />');
	$formTest.append('<input type="checkbox" checked name="checkbox[]" value="2" />');
	// Select
	$formTest.append('<select name="select"><option value="val" selected>5</option></select>');

	// Invalid input
	$formTest.append('<input type="text" value="5" name="invalid[" />');

	// Fixed numeric
	$formTest.append('<input type="text" value="5" name="te[1]" />');
})(jQuery,O2);
