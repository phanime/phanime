Template.charactersAdd.events({
	'change #uploadCharacterCover' : function(event, template) {
		var file = template.find('#uploadCharacterCover').files[0];
		console.log(file);
		//Meteor.call()
		var reader = new FileReader();
		reader.onload = function(e) {

			Session.set('fileUrl', "e.target.result");
			$('#test').attr('src', e.target.result);

		}
		reader.readAsDataURL(file);
	}
});

Template.charactersAdd.fileUrl = function() {
	console.log(Session.get('fileUrl'));
	return Session.get('fileUrl');
};