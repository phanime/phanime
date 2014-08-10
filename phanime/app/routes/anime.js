import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('title');
	},
	title: function(tokens) {
		return tokens[0] + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('anime', {slug: params.slug}).then(function(data) {
			return data.get('firstObject');
		});
	},
	serialize: function(anime) {
		return { slug: anime.get('slug') };
	},
	setupController:function(controller, anime) {
		controller.set('model', anime);

		if(Ember.isNone(anime.get('episodes.data')) || Ember.isNone(anime.get('castings.data')) || Ember.isNone(anime.get('genres.data')) || Ember.isNone(anime.get('staff_members.data'))){
			anime.reload();
		}
	
		this._super();

		this.controllerFor('application').set('currentAnime', anime);
	},

	// TODO Move these into controller if updates properly
	coverClass: "animeCover",
	coverTitle: "",
	coversubTitle: "",

});