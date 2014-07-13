import Ember from 'ember';

export default Ember.Route.extend({
	title: function() {
		return "Login" + this.get('settings.urlSeparator') + this.get('settings.siteName');
	}
});