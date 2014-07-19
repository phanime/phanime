import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	needs: 'anime',
	isEditing: false,

	changeEpName: function() {
		var episodeNumber = this.get('model.episode_number');
		var name = this.get('model.name');
		name = name.substring(0, name.length - 1) + episodeNumber;
		console.log(name);
		//this.set('model.episode_name', name);

	}.observes('model.episode_number'),

	actions: {
		edit: function() {
			this.toggleProperty('isEditing');
		},
		save_changes: function(episode) {

			var onSuccess = function(episode) {
				var msg = episode.get('name') + " was successfully saved.";
				console.log(msg);
				Notify.success(msg);
			};

			var onFailure = function() {
				var msg = "Something went wrong, episode was not saved.";
				console.log(msg);
				Notify.warning(msg);
			};

			episode.save().then(onSuccess, onFailure);
		},
	},

	// Select required properties 
	// TODO: put these in the database preferably
	episode_versions: [
		"Subbed",
		"Dubbed"
	],
});
