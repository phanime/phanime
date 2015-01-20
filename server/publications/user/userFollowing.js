Meteor.publishComposite('userWithFollowing', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username}, {fields: requireCollectionFields.user.removeServices});
		},
		children: [
			{
				find: function(user) {
					if (user.following) { 
						return Meteor.users.find({_id: {$in: user.following}}, {fields: requireCollectionFields.user.defaultFields});
					}
				}
			}

		]
	};

});
