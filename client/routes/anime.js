AnimeController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('animeBySlug', this.params.slug);
	},

	data: function () {
		var anime = Anime.findOne({slug: this.params.slug});


		// Add episodes once the subscription is ready
		// if (this.ready()) {
		// 	anime.episodes = Episodes.find({animeId: this.params.Id});
		// }


		return anime;
	}

});