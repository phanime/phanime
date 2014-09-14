// Publish single user

Meteor.publish('user', function(username) {
	return Meteor.users.find({username: username});
});

Meteor.publishComposite('userWithProfilePosts', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					return ProfilePosts.find({userId: user._id});
				},
				children: [
					{
						// Publish the poster as well if it wasn't a status update
						find: function(profilePost, user) {
							if (profilePost.statusUpdate === false) {
								return Meteor.users.find({_id: profilePost.posterId});
							}
						}
					}

				]
			}
		]
	};

});


Meteor.publishComposite('userWithActivity', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					return Activity.find({userId: user._id});
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
					},
					{
						find: function(activity, user) {
							if (activity.type === 'post') {

								if (activity.post.type === 'profilePost') {
									return Meteor.users.find({_id: activity.post.posterId});
								}

							}
						}
					}

				]
			}
		]
	};

});

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


Meteor.publish('userAlerts', function(userId) {
	// Grab the currently logged in user's alerts
	return Alerts.find({userId: this.userId});
});