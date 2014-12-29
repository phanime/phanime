Meteor.publishComposite('userWithLibraryEntries', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					
					// If user's profile is not current profile we don't publish private entries
					if (user._id !== this.userId) {
						return LibraryEntries.find({userId: user._id, privacy: {$ne: true}}, {sort: {createdAt: -1}, limit: 6});
					} else {
						return LibraryEntries.find({userId: user._id}, {sort: {createdAt: -1}, limit: 6});
					}
				},
				children: [
					{
						find: function(libraryEntry, user) {

							return Anime.find({_id: libraryEntry.animeId}, {fields: requireCollectionFields.anime.requiredLibraryEntry});

						}
					}
				]
			}

		]
	};

});