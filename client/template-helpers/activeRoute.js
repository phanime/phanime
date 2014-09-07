UI.registerHelper("activeRoute", function(route) {
	// console.log(route);
	// console.log(Router.current().route.name);
	if (Router.current().route.name === route) {
		return 'active';
	} else {
		return '';
	}
});
