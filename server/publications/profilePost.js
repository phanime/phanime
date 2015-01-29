Meteor.publishComposite("profilePost", function(profilePostId) {
	return {
		find: function() {
			return ProfilePosts.find({_id: profilePostId});
		},
		children: [
			{
				// Publish the poster if it's not the current user
				find: function(profilePost) {
					if (profilePost.posterId !== this.userId) {
						return Meteor.users.find({_id: profilePost.posterId}, {fields: requireCollectionFields.user.defaultFields});
					}
				}
			},
			{
				// Publish the profile post's comments
				find: function(profilePost) {
					return Comments.find({contentId: profilePost._id, type: 'profilePost'});
				},
				children : [
					{
						find: function(comment, profilePost) {
							// Publish users if they haven't been published already 
							if (comment.userId !== this.userId) {
								return Meteor.users.find({_id: comment.userId}, {fields: requireCollectionFields.user.defaultFields});
							}
						}
					}

				]
			}
		]
	};

});