Template.studiosAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadCharacterCover').files[0];
		console.log(file);
		
		uploadImage(file, 'studios', 'logo');
	}
});

Template.studiosAdd.fileUrl = function() {
	return Session.get('fileUrl');
};

Template.studiosAdd.destroyed = function() {
	// Remove session fileUrl
	Session.set('fileUrl', null);
};