UI.registerHelper("arrayLength", function(array) {
	if (array && array.constructor === Array) {
		return array.length;
	}
});