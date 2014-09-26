Meteor.publishComposite('index', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					return ProfilePosts.find({$or: [{userId: user._id}, {userId: {$in: user.following}}]});
				},
				children: [
					{
						// Publish the poster as well if it wasn't a status update
						find: function(profilePost, user) {
							if (profilePost.statusUpdate === false) {
								return Meteor.users.find({_id: profilePost.posterId}, {fields: {username: 1, profile: 1}});
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
										return Meteor.users.find({_id: comment.userId}, {fields: {username: 1, profile: 1}});
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