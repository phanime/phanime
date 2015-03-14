Template.userProfileSummary.created = function() {
	this.isEditing = new ReactiveVar(false);
};

Template.userProfileSummary.rendered = function() {
	// Add a tool tip init here
};

Template.userProfileSummary.events({
	'click #editProfile' : function(event, template) {
		template.isEditing.set(!template.isEditing.get());
	},

	'click #saveProfile' : function(event, template) {
		// Let's save things
		var about = $("#profileAboutInput").val().trim();
		var location = $("#profileLocationInput").val().trim();
		var website = $("#profileWebsiteInput").val().trim();

		var currentProfile = template.data.profile;
		var newProfile = currentProfile;

		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.about': about, 'profile.location': location, 'profile.website': website}});
		Notifications.success("Profile changes saved!", "Your profile has been successfully saved");

		// Toggle the isEditing reactive var
		template.isEditing.set(!template.isEditing.get());
	},

	'click #follow' : function(event, template) {
		var user = template.data;
		Meteor.call('followUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});

	},

	'click #unfollow' : function (event, template) {
		var user = template.data;
		Meteor.call('unFollowUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});
	}

});


Template.userProfileSummary.helpers({
	isEditing: function() {
		return Template.instance().isEditing.get();
	}
});
