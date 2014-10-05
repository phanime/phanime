// Helpers to determine the fields we need when publishing
uploadToS3Helpers = {
	buildUploadUrl: function(imageName, contentDirectory, typeDirectory, contentId) {
		var key;

		if (contentId) {
			key = "images/" + contentDirectory + "/" + typeDirectory + "/" + contentId + "/" + imageName;
		} else {
			key = "images/" + contentDirectory + "/" + typeDirectory + "/" + imageName;
		}

		return key;		
	},
	buildImageNameWithExtension: function(name, contentType) {
		return name + "." + this.contentTypes[contentType];
	},
	imageSizeInLimit: function(imageSize) {
		return imageSize < 2000000;
	},
	contentTypes: {
		'image/gif': 'gif', 
		'image/jpeg': 'jpg', 
		'image/png': 'png'		
	},
	fileIsImage: function(contentType) {
		if (this.contentTypes[contentType]) {
			return true;
		} else {
			return false;
		}
	}
};