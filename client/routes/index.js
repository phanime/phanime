IndexController = RouteController.extend({
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
		this.next();
	},
	// Disable iron-router progress on static page
	progress: false

});
