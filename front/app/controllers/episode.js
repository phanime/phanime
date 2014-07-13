import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: 'anime',
	isEditing: false,

	changeEpName: function() {
		var episodeNumber = this.get('model.episode_number');
		var name = this.get('model.episode_name');
		name = name.substring(0, name.length - 1) + episodeNumber;
		console.log(name);
		//this.set('model.episode_name', name);

	}.observes('model.episode_number'),

	actions: {
		edit: function() {
			this.toggleProperty('isEditing');
		}
	},

	// Select required properties 
	// TODO: put these in the database preferably
	episode_versions: [
		"Subbed",
		"Dubbed"
	],
});
