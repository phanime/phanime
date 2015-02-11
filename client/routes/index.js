IndexController = RouteController.extend({
	template: "landing",
	onBeforeAction: function () {
		if (Meteor.user()) {
			Router.go('dashboard');
		}
		// console.log(siteSettings.title + " " + siteSettings.separator + " " + siteSettings.slogan);
		// SEO.set({
		// 	title: "Explore Anime | Phanime",
		// 	meta: {
		// 		'description' : 'Explore anime like never before on phanime'
		// 	}
		// });
		console.log("Other acctions");
		debugger;
		this.next();
	},

	action: function() {
		console.log("Action");
		debugger;
	},

	// Disable iron-router progress on static page
	progress: false

});
