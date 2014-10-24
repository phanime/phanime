AnimeReviewController = RouteController.extend({
	

	onAfterAction: function () {
		if (this.ready()) {
			var review = Reviews.findOne({_id: this.params._id});
			var anime = Anime.findOne({_id: review.animeId});
			var user = Meteor.users.findOne({_id: review.userId});

			SEO.set({
				title: siteSettings.getFullTitle(anime.canonicalTitle + " Review by " + user.displayName()),
				meta: {
					'description' : review.summary
				},
				og: {
					'title' : siteSettings.getFullTitle(anime.canonicalTitle + " Review by " + user.displayName()),
					'description' : review.summary,
					'type' : 'review',
					'image' : anime.coverImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('animeReview', this.params._id);
	},

	data: function () {

		if (this.ready()) {
			var review = Reviews.findOne({_id: this.params._id});
			review.anime = Anime.findOne({_id: review.animeId});
			review.user = Meteor.users.findOne({_id: review.userId});
		
			return review;
		}
	}

});