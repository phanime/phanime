Meteor.methods({
	uploadImage: function(image, imageName, imageSize, imageType, contentDirectory, typeDirectory, contentId) {

		var imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

		console.log(imageTypes.indexOf(imageType));
		console.log(imageSize);

		// We don't want the upload to block other requests!
		this.unblock();

		// Ensure we only get images
		if (imageTypes.indexOf(imageType) === -1)
			throw new Meteor.Error(403, 'Only image files allowed (gif, jpeg, png)');

		// Ensure size is less than 2 MB
		// The imageSize variable is in bytes
		if (imageSize > 2000000)
			throw new Meteor.Error(403, 'Max file size of 2 MB allowed');

		// Temporary, for testing purposes
		// should move to environment variables
		// after
		AWS.config.update({
			accessKeyId: privateSiteSettings.awsAccessKeyId, 
			secretAccessKey: privateSiteSettings.awsSecretAccessKey,
		});

		var s3 = new AWS.S3();
		var key;

		// If content ID exists we should add that in
		if (contentId) {
			key = "images/" + contentDirectory + "/" + typeDirectory + "/" + contentId + "/" + imageName;
		} else {
			key = "images/" + contentDirectory + "/" + typeDirectory + "/" + imageName;
		}

		if (image) {
			s3.createBucket({Bucket: 'phanime'}, function() {

				var params = {
					Bucket: 'phanime', 
					Key: key, 
					Body: new Buffer(image, 'binary'),
					ACL: 'public-read',
					ContentType: imageType
				};

				s3.putObject(params, function(err, data) {

					if (err) {
						console.log(err);
					} else {
						console.log('Successfully uploaded data to ' + params.Bucket + "/" + params.Key);
					}

				});


			});
			

			return {
				imageName: imageName,
				imageUrl: "http://cdn.phanime.com/" + key,
			}
		}

	},

	uploadImageFromUrl: function(url, contentDirectory, typeDirectory, contentId) {
		var options;
		var request = Npm.require('request');

		options = {
			uri: url,
			encoding: 'binary'
		};


		console.log(url);

		if (!contentId) {
			throw new Meteor.Error(403, 'Content ID must be defined for this method');
		}

		request(options, Meteor.bindEnvironment(function(error, response, body) {
			// console.log(error);
			// console.log(response);
			// console.log(body);

			var contentType = response.headers['content-type'];
			var contentSize = response.headers['content-length'];
			var imageName = uploadToS3Helpers.buildImageNameWithExtension("1", contentType);
			var key = uploadToS3Helpers.buildUploadUrl(imageName, contentDirectory, typeDirectory, contentId);


			if (!uploadToS3Helpers.imageSizeInLimit(contentSize)){
				throw new Meteor.Error(403, 'Max file size of 2 MB allowed');
			} 

			if (!uploadToS3Helpers.fileIsImage(contentType)) {
				// console.log('Not image file');
				throw new Meteor.Error(403, 'Only images are allowed (gif, jpeg, png)');
			} 



			AWS.config.update({
				accessKeyId: privateSiteSettings.awsAccessKeyId, 
				secretAccessKey: privateSiteSettings.awsSecretAccessKey,
			});

			var s3 = new AWS.S3();

			s3.createBucket({Bucket: 'phanime'}, Meteor.bindEnvironment(function() {

				var params = {
					Bucket: 'phanime', 
					Key: key, 
					Body: new Buffer(body, 'binary'),
					ACL: 'public-read',
					ContentType: contentType
				};

				s3.putObject(params, Meteor.bindEnvironment(function(err, data) {

					if (err) {
						console.log(err);
						throw new Meteor.Error(403, err);
					} else {
						console.log('Successfully uploaded data to ' + params.Bucket + "/" + params.Key);

						// Temporary for now, this ensures the document is updated only if the 
						// image was successfully uploaded
						if (contentDirectory === 'anime', typeDirectory === 'cover') {
							Anime.update({_id: contentId}, {$set: {coverImage: imageName}});
						}

					}

				}));


			}));

		}));

	}	


});