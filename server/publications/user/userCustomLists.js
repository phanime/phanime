Meteor.publishComposite('userCustomLists', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					return CustomLists.find({userId: user._id}, {sort: {createdAt: -1}});
				}
			}
		]
	};

});