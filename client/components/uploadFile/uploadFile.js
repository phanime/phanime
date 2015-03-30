Template.uploadFile.events({
	'change .upload-file' : function(event, template) {
		var file = template.find(event.target).files[0];
		var data = template.data;

		if (data.contentDirectory && data.typeDirectory) {
			uploadImage(file, data.contentDirectory, data.typeDirectory, data.contentId);
		}
	}
});