Meteor.publishComposite('userWithFollowers', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username}, {fields: requireCollectionFields.user.removeServices});
		},
		children: [
			{
				find: function(user) {
					if (user.followers) {
						// We also want their followers
						var fields = requireCollectionFields.user.defaultFields;
						fields.followers = 1;
						return Meteor.users.find({_id: {$in: user.followers}}, {fields: fields});
					}
				}
			}

		]
	};

});
