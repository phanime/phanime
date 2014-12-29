Meteor.publishComposite('userWithRevisions', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
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