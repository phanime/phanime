Meteor.methods({
	uploadImage: function(image, imageName, imageSize, imageType, contentDirectory, typeDirectory, contentId) {

		// We'll use the unix timestamp as the name of the file.
		var imageName = uploadToS3Helpers.buildImageNameWithExtension(new Date().getTime(), imageType);
		var key = uploadToS3Helpers.buildUploadUrl(imageName, contentDirectory, typeDirectory, contentId);


		// We don't want the upload to block other requests!
		this.unblock();


		// Ensure we only get images
		if (!uploadToS3Helpers.imageSizeInLimit(imageSize)) {
			throw new Meteor.Error(403, 'Max file size of 2 MB allowed');
		} 

		if (!uploadToS3Helpers.fileIsImage(imageType)) {
			// console.log('Not image file');
			throw new Meteor.Error(403, 'Only images are allowed (gif, jpeg, png)');
		}


		AWS.config.update({
			accessKeyId: privateSiteSettings.awsAccessKeyId, 
			secretAccessKey: privateSiteSettings.awsSecretAccessKey,
		});

		var s3 = new AWS.S3();

		if (image) {
			s3.createBucket({Bucket: Meteor.settings.awsBucket}, function() {

				var params = {
					Bucket: Meteor.settings.awsBucket, 
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
		var request = Meteor.npmRequire('request');

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

			s3.createBucket({Bucket: Meteor.settings.awsBucket}, Meteor.bindEnvironment(function() {

				var params = {
					Bucket: Meteor.settings.awsBucket, 
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
						if (contentDirectory === 'anime' && typeDirectory === 'cover') {
							var modifiedNumber = Anime.update({_id: contentId}, {$set: {coverImage: imageName}});
							console.log(modifiedNumber);
						}

					}

				}));


			}));

		}));

	}	


});