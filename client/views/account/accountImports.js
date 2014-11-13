Template.accountImports.events({
	
	'click #importMal' : function(event, template) {
		var username = $('#malUsername').val();

		// We let the user know that we've started the import
		Notifications.info('Import Started', "We've started importing your MAL list");

		Meteor.call('getMALUserList', username, function(error, result) {
			// Give the user some type of indication if an error occurred 
			// or if the import was successful
			if (!error)
				Notifications.success('Import Successful', 'We were able to successfully import your MAL list');
			else 
				Notifications.error('Import Failed', error.reason);
		});

	} 

});