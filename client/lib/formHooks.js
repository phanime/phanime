AutoForm.hooks({
	insertRevisionAnime: {

		onSuccess: function(operation, result, template) {
			Notifications.success('Revision submitted successfully', 'The moderators have been notified to look over this revision.');
		},

		onError: function(operation, error, template) {
			// Form failed validaition
			if (error.invalidKeys) {
				Notifications.error('Revision was not submitted', 'Please check that alll required fields are filled and valid');
			} else if(error.reason) {
				Notifications.error('Revision was not submitted', error.reason);
			}
			
		}
	}
}, true);