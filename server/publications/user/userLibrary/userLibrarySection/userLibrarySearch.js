Meteor.publishComposite('userLibrarySearch', function(user, query) {
	return {
		find: function() {
			// If user's profile is not current profile we don't publish private entries
			var libraryEntries;
			if (user._id !== this.userId) {
				var libraryEntries = LibraryEntries.find({userId: user._id, canonicalTitle: new RegExp(query), privacy: {$ne: true}}, {limit: 20});
			} else {
				var libraryEntries = LibraryEntries.find({userId: user._id, canonicalTitle: new RegExp(query)}, {limit: 20});
			}
			return libraryEntries;
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