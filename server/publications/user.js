// Publish single user

Meteor.publish('user', function(username) {
	return Meteor.users.find({username: username});
});

// Meteor.publish('userWithLibraryEntries', function(username) {
// 	var user = Meteor.users.findOne({username: username});

// 	return [
// 		Meteor.users.find({username: username}),
// 		LibraryEntries.find({userId: user._id})
// 	];
// });


Meteor.publishComposite('userWithLibraryEntries', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					return LibraryEntries.find({userId: user._id});
				},
				children: [
					{
						find: function(libraryEntry, user) {

							return Anime.find({_id: libraryEntry.animeId});

						}
					}
				]
			}

		]
	};

});