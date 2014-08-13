import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('first_name') + " " + model.get('last_name');
	},
	title: function(tokens) {
		return tokens[0] + " - Character " + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('character', params.character_id);
	}
});
