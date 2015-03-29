Template.accountPersonalDetails.events({
	
	'click button' : function(event, template) {
		var location = $('#location').val();
		var occupation = $('#occupation').val();
		var website = $('#website').val();
		var about = $('#about').val();

		var profile = Meteor.user().profile;
		profile.location = location;
		profile.occupation = occupation;
		profile.website = website;
		profile.about = about;

		Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}}, function(error, result) {
			if (error) {
				Notifications.error('Update failed', error.reason);
			} else {
				Notifications.success('Changes saved', 'Your personal details were saved successfully');
			}
		});

		Meteor.call('discourseRefreshSSOPayload', function(error) {
			console.log(error);
		});
	} 

});