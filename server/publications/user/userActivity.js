Meteor.publishComposite('userWithActivity', function(username, limit) {
	return {
		find: function() {
			return Meteor.users.find({username: username}, {fields: requireCollectionFields.user.removeServices});
		},
		children: [
			{
				find: function(user) {
					return Activity.find({userId: user._id}, {sort: {createdAt: -1}, limit: limit});
				},
				children: [
					{
						// Get library entry children
						find: function(activity, user) {
							if (activity.type === 'libraryEntry') {
								// Grab content
								if (activity.libraryEntry.type === 'anime') {
									return Anime.find({_id: activity.libraryEntry.contentId});
								}
							}
						}
					}
				]
			}
		]
	};

});
