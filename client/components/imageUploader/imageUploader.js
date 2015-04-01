Template.imageUploader.events({
	'click .image-uploader__btn' : function(event, template) {
		template.$('.image-uploader__input').click();
	},
	'change .image-uploader__input' : function(event, template) {
		debugger;
	}
});