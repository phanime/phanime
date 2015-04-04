Template.imageUploader.onCreated(function() {
	this.uploader = new Slingshot.Upload(this.data.directive);
	this.isUploading = new ReactiveVar(false);
});

Template.imageUploader.events({
	'click .image-uploader__btn' : function(event, template) {
		template.$('.image-uploader__input').click();
	},
	'change .image-uploader__input' : function(event, template) {
		var file = template.find(event.target).files[0];

		template.isUploading.set(true);
		template.$('.image-uploader__overlay').addClass('image-uploader__overlay--visible');

		template.uploader.send(file, function(error, downloadUrl) {
			if (error) {
				Notifications.error('Upload failed', error.reason);
			} else {
				template.isUploading.set(false);
				template.$('.image-uploader__overlay').removeClass('image-uploader__overlay--visible');
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

Template.imageUploader.helpers({
	uploadProgress: function() {
		if (Template.instance().uploader.progress()) {
			return Math.round(Template.instance().uploader.progress());
		} else {
			return 1;
		}

	},
	uploadPercentage: function() {
		if (Template.instance().uploader.progress() * 100) {
			return Math.round(Template.instance().uploader.progress() * 100) + "%";
		} else {
			return "0%";
		}
	},

	imagePreviewUrl: function() {
		var template = Template.instance();
		if (template.uploader.url(true)) {
			return template.uploader.url(true);
		} else {
			return template.data.imageSrc;
		}
	},
	isUploading: function() {
		return Template.instance().isUploading.get();
	}
});