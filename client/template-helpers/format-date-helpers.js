UI.registerHelper("formatDateDefault", function(date) {
	return moment(date).format("MMM Do, YYYY");
});

UI.registerHelper("formatDateFromNow", function(date) {
	return moment(date).fromNow();
});



UI.registerHelper("formatDateUTC", function(date) {
	return moment(date).utc().format("MMM Do, YYYY");
});