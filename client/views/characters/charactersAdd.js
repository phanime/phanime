Template.charactersAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadCharacterCover').files[0];
		console.log(file);
		
		var reader = new FileReader();
		reader.onload = function(e) {

			Session.set('fileUrl', "asdasd");
			// $('#test').attr('src', e.target.result);


			Meteor.call('uploadImage', e.target.result, file.name, file.size, file.type, 'characters', 'cover', function(error, result) {
				console.log(error);
				console.log(result);
				if (result) {
					Session.set('fileUrl', result.imageName);
					$('#test').attr('src', result.fileUrl);
				}
				
			});

		}
		reader.readAsBinaryString(file);
	}
});

Template.charactersAdd.fileUrl = function() {
	return Session.get('fileUrl');
};