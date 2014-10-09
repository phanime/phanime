AutoForm.hooks({
	insertRevisionsAnime: {

		onSuccess: function(operation, result, template) {
			Notifications.success('Revision submitted successfully', 'The moderators have been notified to look over this revision.');
		},

		onError: function(operation, error, template) {
			// Form failed validaition
			if (error.invalidKeys) {
				Notifications.error('Revision was not submitted', 'Please check that all required fields are filled and valid');
			} else if(error.reason) {
				Notifications.error('Revision was not submitted', error.reason);
			}
			
		}
	}
}, true);


AutoForm.hooks({
	updateRevisionsAnime: {

		onSuccess: function(operation, result, template) {
			Notifications.success('Revision updated successfully', 'The revision has been updated, you can now approve it if you\'d like');
		},

		onError: function(operation, error, template) {
			// Form failed validaition
			if (error.invalidKeys) {
				Notifications.error('Revision was not updated', 'Please check that all required fields are filled and valid');
			} else if(error.reason) {
				Notifications.error('Revision was not updated', error.reason);
			}
			
		}
	}
}, true);


AutoForm.hooks({
	revisionsAnimeAddEdit: {

		onSuccess: function(operation, result, template) {
			Notifications.success('Revision Committed', 'The revision has been successfully committed, the moderators have been notified');
		},

		onError: function(operation, error, template) {
			// Form failed validaition
			if (error.invalidKeys) {
				Notifications.error('Revision was not committed', 'Please check that all required fields are filled and valid');
			} else if(error.reason) {
				Notifications.error('Revision was not committed', error.reason);
			}
			
		}
	}
}, true);


AutoForm.hooks({
	revisionAnimeUpdateEdit: {

		onSuccess: function(operation, result, template) {
			Notifications.success('Revision updated successfully', 'The revision has been updated, you can now approve it if you\'d like');
		},

		onError: function(operation, error, template) {
			// Form failed validaition
			if (error.invalidKeys) {
				Notifications.error('Revision was not updated', 'Please check that all required fields are filled and valid');
			} else if(error.reason) {
				Notifications.error('Revision was not updated', error.reason);
			}
			
		}
	}
}, true);