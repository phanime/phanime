Template.accountPersonalDetails.onCreated(function() {
	this.avatarUploader = new Slingshot.Upload("uploadUserAvatar");
});

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
	},

	'change .upload-avatar' : function(event, template) {
		var file = template.find(event.target).files[0];

		template.avatarUploader.send(file, function(error, downloadUrl) {
			if (error) {
				Notifications.error('Avatar upload failed', error.reason);
			} else {
				console.log(downloadUrl);
			}
		});
	}

});

Template.accountPersonalDetails.helpers({
  avatarProgress: function () {
  	var template = Template.instance();
    return Math.round(template.avatarUploader.progress() * 100);
  },
  avatarPreviewUrl: function() {
  	var template = Template.instance();
  	return this.uploader.url(true);
  },
  profileBannerProgress: function() {
  	var template = Template.instance();
  	return Math.round(template.profileBannerUploader.progress() * 100);
  }
});