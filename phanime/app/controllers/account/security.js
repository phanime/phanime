import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	existingPassword: null,
	newPassword: null,
	confirmPassword: null,

	actions: {
		changePassword: function() {
			var self = this;
			
			// We'll do the existing password check on the back end
			// Check if the newPassword and confirmPassword fields match
			if (String(this.get('newPassword')) === String(this.get('confirmPassword')) && this.get('newPassword')) {
				
				// We'll send the request here for the serve to do some additional checking and return a response.
				$.post('/api/v1/changePassword/' + this.get('session.currentUser.id'), {existingPassword: this.get('existingPassword'), newPassword: this.get('newPassword')}, function(data) {
					console.log(data);

					if (data.existingPassword) {
						Notify.warning(data.existingPassword);
					} else if (data.user) {
						Notify.success('The password was successfully changed.');
						
						// Reset the fields to null/blank
						self.set('existingPassword', null);
						self.set('newPassword', null);
						self.set('confirmPassword', null);
					}

				});


			} else {
				Notify.warning('New Password confirmation failed.');
			}


		}
	}
});
