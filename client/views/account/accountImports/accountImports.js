Template.accountImports.created = function() {
	this.importSummary = new ReactiveVar(null);
	this.importStarted = new ReactiveVar(false);
};


Template.accountImports.helpers({

	importSummary: function() {
		return Template.instance().importSummary.get();
	}

});

Template.accountImports.events({
	
	'click #importMal' : function(event, template) {
		var username = $('#malUsername').val();
		var file = $('#uploadXMLFile')[0].files[0];


		// We let the user know that we've started the import
		Notifications.info('Import Started', "We've started importing your MAL list, this could take a few minutes.");
		template.importStarted.set(true);

		var reader = new FileReader();
		reader.onload = function(e) {

			var content = e.target.result;

			Meteor.call('getMALUserList', content, function(error, result) {
				// Give the user some type of indication if an error occurred 
				// or if the import was successful
				template.importSummary.set(result);
				template.importStarted.set(false);
				if (!error) {
					if (result.failedImports.length == 0) {
						Notifications.success('Import Successful', 'We were able to successfully import your MAL list');
					} else {
						Notifications.error('Import Failed', 'We failed to import ' + result.failedImports.length + ' entries from your list. Please look at the report generated.', {timeout: 8000});
					}
				} else {
					Notifications.error('Import Failed', error.reason, {timeout: 8000});
				}
			});
		}
		reader.readAsText(file);

	} 

});

Template.accountImports.helpers({
	'importStarted' : function() {
		return Template.instance().importStarted.get();
	}
});