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


Meteor.publishComposite('userWithFollowers', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					if (user.followers) {
						return Meteor.users.find({_id: {$in: user.followers}});
					}
				}
			}

		]
	};

});

Meteor.publishComposite('userWithFollowing', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					if (user.following) { 
						return Meteor.users.find({_id: {$in: user.following}});
					}
				}
			}

		]
	};

});