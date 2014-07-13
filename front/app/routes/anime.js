import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('anime_title');
	},
	title: function(tokens) {
		return tokens[0] + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('anime', {anime_slug: params.anime_slug}).then(function(data) {
			return data.get('firstObject');
		});
	},
	serialize: function(anime) {
		return { anime_slug: anime.get('anime_slug') };
	},
	setupController:function(controller, anime) {
		controller.set('model', anime);
		this.controllerFor('anime').set('isSubLink', false);
		this.controllerFor('anime').set('isTitleLink', false);
		this.controllerFor('anime').set('subTitle', '');
		this.controllerFor('anime').set('title', anime.get('anime_title'));

		if(Ember.isNone(anime.get('episodes.data'))){
			anime.reload();
		}
	
		this._super();
	}

});