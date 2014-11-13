Template.accountImports.events({
	
	'click #importMal' : function(event, template) {
		var username = $('#malUsername').val();
		var file = $('#uploadXMLFile')[0].files[0];

		console.log(file);


		// We let the user know that we've started the import
		Notifications.info('Import Started', "We've started importing your MAL list, this could take a few moments.");

		var reader = new FileReader();
		reader.onload = function(e) {

			var content = e.target.result;

			Meteor.call('getMALUserList', content, function(error, result) {
				// Give the user some type of indication if an error occurred 
				// or if the import was successful
				if (!error)
					Notifications.success('Import Successful', 'We were able to successfully import your MAL list');
				else 
					Notifications.error('Import Failed', error.reason);
			});
		}
		reader.readAsText(file);

	} 

});