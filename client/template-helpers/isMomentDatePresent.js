UI.registerHelper("isMomentDatePresent", function(date) {
	if (moment(date).year()) {
		return true;
	} else {
		return false;
	}
});
