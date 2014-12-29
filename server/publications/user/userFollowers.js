Meteor.publishComposite('userWithFollowers', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					if (user.followers) {
						return Meteor.users.find({_id: {$in: user.followers}}, {fields: requireCollectionFields.user.defaultFields});
					}
				}
			}

		]
	};

});
