import Ember from 'ember';

export default Ember.Route.extend({
	title: function() {
		return "Add Anime" + this.get('settings.urlSeparator') + this.get('settings.siteName');
	}
});
