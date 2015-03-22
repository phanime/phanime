Meteor.publishComposite('userWithFollowing', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username}, {fields: requireCollectionFields.user.removeServices});
		},
		children: [
			{
				find: function(user) {
					if (user.following) {
						// We also want their followers
						var fields = requireCollectionFields.user.defaultFields;
						fields.followers = 1;
						return Meteor.users.find({_id: {$in: user.following}}, {fields: fields});
					}
				}
			}

		]
	};

});
