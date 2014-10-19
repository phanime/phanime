// Publish a specific review by ID

Meteor.publishComposite("animeReview", function(reviewId) {

	return {
		find: function() {
			return Reviews.find({_id: reviewId});
		},
		children: [
			{
				find: function(review) {
					return Anime.find({_id: review.animeId});
				}
			},
			{
				find: function(review) {
					return Meteor.users.find({_id: review.userId});
				}
			}
		]
	};
});