Meteor.publishComposite('userWithRevisions', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username}, {fields: requireCollectionFields.user.removeServices});
		},
		children: [
			{
				find: function(user) {
					return Revisions.find({userId: user._id});
				}
			}
		]
	};

});