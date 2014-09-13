SearchController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Search" + " " + siteSettings.separator + " " + siteSettings.title
		});
	},

	// waitOn: function () {
	// 	return Meteor.subscribe('animeSearch', this.params.q);
	// },

	// data: function() {

	// 	console.log(this.params.q);

	// 	console.log(Anime.find().fetch());
	// }

});