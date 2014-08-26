UI.registerHelper("getPercentage", function(num, den) {
	if (!den) {
		return '0%';
	} else if (!num) {
		return '0%';
	} else if (num > den) {
		return "100%";
	} else {
		return ((num/den)*100).toFixed(2) + "%";
	}
});
