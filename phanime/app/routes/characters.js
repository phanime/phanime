import Ember from 'ember';

export default Ember.Route.extend({
	title: function(tokens) {
		return "Characters " + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('character');
	}
});
