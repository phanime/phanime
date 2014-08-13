import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	extraParamsCompute: function() {
		var self = this;
		this.get('session.currentUser').then(function(user) {
			console.log(user);
			console.log(user.get('username'));
			self.set('avatarParams', "&imageCategory=avatar&contentID=" + user.get('id') + "&imageFor=users");
			self.set('profileBannerParams', "&imageCategory=profileBanner&contentID=" + user.get('id') + "&imageFor=users");
		});
	}.observes('avatarParams', 'profileBannerParams').on('init'),
	avatarParams: null,
	profileBannerParams: null,
	actions: {
		filesUploaded: function(data) {
			this.get('session.currentUser').then(function(user) {
				user.set('avatar', data.name[0].name);

				console.log(user.get('avatar'));

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
		},
		profileBannerUploaded: function(data) {

			this.get('session.currentUser').then(function(user) {
				user.set('profileBanner', data.name[0].name);

				console.log(user.get('profileBanner'));

				var onSuccess = function() {
					var msg = "Profile Banner updated";
					console.log(msg);
					Notify.success(msg);
				};

				var onFailure = function() {
					var msg = "Something went wrong, profile banner was not updated";
					console.log(msg);
					Notify.warning(msg);
				};

				user.save().then(onSuccess, onFailure);		
			});


		}
	}
});
