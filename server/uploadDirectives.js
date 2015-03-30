Slingshot.createDirective("uploadUserAvatar", Slingshot.S3Storage, {
	bucket: Meteor.settings.AWSBucket,
	acl: "public-read",
	authorize: function () {
		// Deny uploads if user is not logged in.
		if (!this.userId) {
			var message = "Please login before uploading files";
			throw new Meteor.Error("Login Required", message);
		}
		return true;
	},
	key: function (file) {
		// Store file into a directory by the user's username.
		var fileName = uploadToS3Helpers.buildImageNameWithExtension(Random.id(), file.type);
		return uploadToS3Helpers.buildUploadUrl(fileName, "users", "avatar", this.userId);
	}
});