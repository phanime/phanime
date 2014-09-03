SearchController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Search | Phanime"
		});
	},

	waitOn: function () {
		return Meteor.subscribe('animeSearch', this.params.q);
	},

	data: function() {

		console.log(this.params.q);

		console.log(Anime.find().fetch());
	}

});