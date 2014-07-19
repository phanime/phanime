import Ember from 'ember';

export default Ember.Route.extend({
	title: function() {
		return "Anime List" + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function() {
		return this.store.find('anime');
	}
});
