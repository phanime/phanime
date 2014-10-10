UI.registerHelper("isMomentDatePresent", function(date) {
	if (moment(date).year() && date !== undefined) {
		return true;
	} else {
		return false;
	}
});
