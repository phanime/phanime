import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('first_name') + " " + model.get('last_name');
	},
	title: function(tokens) {
		return tokens[0] + " - Person " + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('person', params.person_id);
	},
	serialize: function(person) {
		return {
			person_id: person.get('id'),
			person_slug: person.get('full_name_slug'),
		};
	},	
});
