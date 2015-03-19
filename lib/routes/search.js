SearchController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Search")
		});
		this.next();
	},

	// waitOn: function () {
	// 	return Meteor.subscribe('animeSearch', this.params.q);
	// },

	// data: function() {

	// 	console.log(this.params.q);

	// 	console.log(Anime.find().fetch());
	// }

});