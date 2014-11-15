Template.animeAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadAnimeCover').files[0];
		console.log(file);
		
		uploadImage(file, 'anime', 'cover');
	}
});

Template.animeAdd.helpers({
	fileUrl: function() {
		return Session.get('fileUrl');
	},
	destroyed: function() {
		// Remove session fileUrl
		Session.set('fileUrl', null);
	}
});