import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('episode_name');
	},
	title: function(tokens) {
		return tokens[0] + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		var anime = this.modelFor('anime');
		return this.store.find('episode', {episode_number: params.episode_number, anime_id: anime.get('id')}).then(function(data) {
			return data.get('firstObject');
		});
	},
	serialize: function(episode) {
		return { episode_number: episode.get('episode_number') };
	},
	setupController: function(controller, episode) {
		controller.set('model', episode);
		var anime = this.modelFor('anime');
		var anime_type = anime.get('anime_type');

		// This is only to prefix episode number
		if (anime_type === 'TV') {
			anime_type = 'Episode';
		}

		this.controllerFor('anime').set('coverClass', 'episodeCover');
		
		this.controllerFor('anime').set('coverTitle', anime.get('anime_title'));
		this.controllerFor('anime').set('coversubTitle', anime_type + " " + episode.get('episode_number'));

	}
});
