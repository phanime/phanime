import Ember from 'ember';

export default Ember.Route.extend({
	title: function() {
		return this.get('settings.siteName') + this.get('settings.urlSeparator') + this.get('settings.siteSlogan');
	},
	model: function() {
		return this.store.find('anime', {featured: true});
	},
	serialize: function(anime) {
		return { anime_slug: anime.get('anime_slug') };
	},
});