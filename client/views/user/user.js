Template.user.events({
	
	'click #follow' : function(event, template) {
		var user = template.data;
		
		// Run a method on the server to add the follower
		Meteor.call('followUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});

	}
	
});
