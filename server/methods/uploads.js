Meteor.methods({
	uploadImage: function(image, imageName, imageSize, imageType, contentDirectory, typeDirectory, contentId) {

		var imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

		console.log(imageTypes.indexOf(imageType));
		console.log(imageSize);


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








	}


});