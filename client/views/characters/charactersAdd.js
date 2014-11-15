Template.charactersAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadCharacterCover').files[0];
		console.log(file);
		
		uploadImage(file, 'characters', 'cover');
	}
});

Template.charactersAdd.helpers({
	fileUrl: function() {
		return Session.get('fileUrl');
	},
	destroyed: function() {
		// Remove session fileUrl
		Session.set('fileUrl', null);
	}
});