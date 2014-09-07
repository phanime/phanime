UI.registerHelper("activeRoute", function(route) {
	if (Router.current().route.name === route) {
		return 'active';
	} else {
		return '';
	}
});
