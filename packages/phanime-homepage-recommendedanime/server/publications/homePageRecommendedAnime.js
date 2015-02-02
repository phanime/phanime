Meteor.publishComposite('homePageRecommendedAnime', function() {
	return {
		find: function() {
			return Meteor.users.find({_id: this.userId});
		},
		children: [
			{
				find: function(user) {
					var animeIds = _.pluck(user.recommendedAnime, 'animeId');
					// Limit to 12 recommendations for now
					return Anime.find({_id: {$in: animeIds}}, {fields: requireCollectionFields.anime.requiredLibraryEntry, limit: 12});
				},
				children: [
					{
						find: function(anime, user) {
							return LibraryEntries.find({userId: user._id, animeId: anime._id});
						}
					}
				]
			}
		]
	};
});