Template.userSummary.events({
	
	'click #follow' : function(event, template) {
		var user = template.data;
		
		// Run a method on the server to add the follower
		Meteor.call('followUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});

	},

	'click #unfollow' : function (event, template) {
		var user = template.data;

		console.log('unfollow users');

		// Run a method on the server to unfollow a user
		Meteor.call('unFollowUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});
	}
	
});
