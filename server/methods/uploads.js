Meteor.methods({
	uploadImage: function(image, imageName, imageSize, imageType, contentDirectory, typeDirectory) {
		// Temporary, for testing purposes
		// should move to environment variables
		// after
		AWS.config.update({
			accessKeyId: 'AKIAJQHYOKA5YCOWQSAQ', 
			secretAccessKey: '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',
		});

		var s3 = new AWS.S3();



		s3.createBucket({Bucket: 'phanime'}, function() {

			var params = {
				Bucket: 'phanime', 
				Key: "images/" + contentDirectory + "/" + typeDirectory + "/" + imageName, 
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
		

		return " Stuff ";


	}


});