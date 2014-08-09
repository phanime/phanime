import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	extraParamsCompute: function() {
		var self = this;
		this.get('session.currentUser').then(function(user) {
			console.log(user);
			console.log(user.get('username'));
			self.set('extraParams', "&imageCategory=avatar&namePref=" + user.get('id') + "&imageFor=users");
			//self.set('extraParams', '');
		});
	}.observes('extraParams').on('init'),
	extraParams: null,
});
