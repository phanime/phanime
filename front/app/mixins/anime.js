import Ember from 'ember';

export default Ember.Route.extend({

	model: function(params) {
		return this.store.find('anime', params.anime_slug);
	},
	serialize: function(anime) {
		return { anime_slug: anime.get('anime_slug') };
	},
	afterModel: function(anime) {
		var siteTitle = "phanime";
		document.title = anime.get('anime_title') + " | " + siteTitle;
	}

});