Meteor.publishComposite('homePageUserFeed', function(limit) {
	return {
		find: function() {
			// Find the current user
			return Meteor.users.find({_id: this.userId}, {fields: {services: 0}});
		},
		children: [
			// For some reason this causes some errors, need to figure out what's wrong exactly
			// Possibly an issue with the user.following not being an array / or user.following not existing
			{
				find: function(user) {
					if (!user.following) {
						user.following = [];
					}
					return ProfilePosts.find({$or: [{userId: user._id}, {statusUpdate: true, userId: {$in: user.following}}]}, {limit: limit, sort: {createdAt: -1}});
				},
				children: [
					{
						// Publish the poster if it's not the current user
						find: function(profilePost, user) {
							if (profilePost.posterId !== this.userId) {
								return Meteor.users.find({_id: profilePost.posterId}, {fields: {originalUsername: 1, username: 1, profile: 1}});
							}
						}
					},
					{
						// Publish the profile post's comments
						find: function(profilePost, user) {

							return Comments.find({contentId: profilePost._id, type: 'profilePost'});

						},
						children : [
							{
								find: function(comment, profilePost, user) {
									// Publish users if it isn't published 
									if (comment.userId !== user._id && comment.userId !== profilePost.posterId) {
										return Meteor.users.find({_id: comment.userId}, {fields: {originalUsername: 1, username: 1, profile: 1}});
									}
								}
							}

						]

					}
				]
			}
		]
	};
});