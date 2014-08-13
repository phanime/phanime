import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	extraParamsCompute: function() {
		var self = this;
		this.get('session.currentUser').then(function(user) {
			console.log(user);
			console.log(user.get('username'));
			self.set('extraParams', "&imageCategory=avatar&contentID=" + user.get('id') + "&imageFor=users");
			//self.set('extraParams', '');
		});
	}.observes('extraParams').on('init'),
	extraParams: null,
	actions: {
		filesUploaded: function() {
			this.get('session.currentUser').then(function(user) {
				user.set('avatar', user.get('id'));

				var onSuccess = function() {
					var msg = "Avatar updated";
					console.log(msg);
					Notify.success(msg);
				};

				var onFailure = function() {
					var msg = "Something went wrong, avatar was not updated";
					console.log(msg);
					Notify.warning(msg);
				};

				user.save().then(onSuccess, onFailure);		
			});			
		}
	}
});
