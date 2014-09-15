Meteor.methods({
	uploadImage: function(image, imageName, imageSize, imageType, contentDirectory, typeDirectory, contentId) {
		// Temporary, for testing purposes
		// should move to environment variables
		// after
		AWS.config.update({
			accessKeyId: privateSiteSettings.accessKeyId, 
			secretAccessKey: privateSiteSettings.secretAccessKey,
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








	}


});