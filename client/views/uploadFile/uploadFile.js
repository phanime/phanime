Template.uploadFile.events({
	'change .upload-file' : function(event, template) {
		var file = template.find(event.target).files[0];

		// console.log(file);
		// console.log(template.data);

		if (contentDirectory && typeDirectory)
			uploadImage(file, contentDirectory, typeDirectory);
	}
})