Meteor.publishComposite('homePageActiveEntries', function() {
	return {
		find: function() {
			return LibraryEntries.find({userId: this.userId, $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {sort: {updatedAt: -1}, limit: 6});
		},
		children: [
			{
				find: function(libraryEntry) {
					return Anime.find({_id: libraryEntry.animeId}, {fields: requireCollectionFields.anime.requiredLibraryEntry});
				}
			}
		]
	};
});