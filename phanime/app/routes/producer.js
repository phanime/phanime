import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('name');
	},
	title: function(tokens) {
		return tokens[0] + " - Producer " + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('producer', params.producer_id);
	},
	serialize: function(producer) {
		return {
			producer_id: producer.get('id'),
			producer_slug: producer.get('slug'),
		};
	},	
});
