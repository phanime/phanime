Template.imageUploader.onCreated(function() {
	this.uploader = new Slingshot.Upload(this.data.directive);
});

Template.imageUploader.events({
	'click .image-uploader__btn' : function(event, template) {
		template.$('.image-uploader__input').click();
	},
	'change .image-uploader__input' : function(event, template) {
		var file = template.find(event.target).files[0];

		template.uploader.send(file, function(error, downloadUrl) {
			if (error) {
				Notifications.error('Upload failed', error.reason);
			} else {
				var index = downloadUrl.lastIndexOf('/') + 1;
				var fileName = downloadUrl.substring(index);
				
				// This should really be handled in the parent template
				// but there is no easy way of communicating with the parent
				// template.
				switch (template.data.directive) {
					case "uploadUserAvatar":
						Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.avatarImage": fileName}});
						break;
				}
			}
		});
	}
});