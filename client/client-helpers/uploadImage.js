uploadImage = function(file, contentDirectory, typeDirectory) {
	var reader = new FileReader();
	reader.onload = function(e) {

		Session.set('fileUrl', "asdasd");
		// $('#test').attr('src', e.target.result);

		Meteor.call('uploadImage', e.target.result, file.name, file.size, file.type, contentDirectory, typeDirectory, function(error, result) {
			console.log(error);
			console.log(result);
			if (result) {
				Session.set('fileUrl', result.imageName);
				$('.imagePreview').attr('src', result.fileUrl);
			}

		});

	}

	if (file) {
		reader.readAsBinaryString(file);
	}
};