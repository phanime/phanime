Template.peopleAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadCharacterCover').files[0];
		console.log(file);
		
		uploadImage(file, 'people', 'cover');
	}
});

Template.peopleAdd.fileUrl = function() {
	return Session.get('fileUrl');
};