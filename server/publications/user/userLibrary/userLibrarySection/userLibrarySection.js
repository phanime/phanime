Meteor.publishComposite('userLibrarySection', function(username, selectedStatus, sortField, sortOrder, limit) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					
					// Create the sort object
					var sortObj = {};
					sortObj[sortField] = (sortOrder === 'asc') ? 1 : -1;		
								
					// If user's profile is not current profile we don't publish private entries
					if (user._id !== this.userId) {
						return LibraryEntries.find({userId: user._id, status: selectedStatus, privacy: {$ne: true}}, {sort: sortObj, limit: limit});
					} else {
						return LibraryEntries.find({userId: user._id, status: selectedStatus}, {sort: sortObj, limit: limit});
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
