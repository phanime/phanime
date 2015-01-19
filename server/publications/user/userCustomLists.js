Meteor.publishComposite('userCustomLists', function(username) {
	return {
		find: function() {
			return Meteor.users.find({username: username});
		},
		children: [
			{
				find: function(user) {
					if (user._id !== this.userId) {
						return CustomLists.find({userId: user._id, privacy: {$ne: true}}, {sort: {createdAt: -1}});
					} else {
						return CustomLists.find({userId: user._id}, {sort: {createdAt: -1}});
					}
					
				}
			}
		]
	};

});