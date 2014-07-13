import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	isEditing: false,
	titleChanged: function() {
		var slug = this.get('model.anime_title').replace(/\s+/g, '-').toLowerCase();
		// Set the the anime slug
		this.set('model.anime_slug', slug);

	}.observes('model.anime_title'),

	actions: {
		edit: function() {
			this.toggleProperty('isEditing');
		},
		save_changes: function(anime) {

			var onSuccess = function(anime) {
				var msg = anime.get('anime_title') + " was successfully saved.";
				console.log(msg);
				Notify.success(msg);
			};

			var onFailure = function(anime) {
				var msg = "Something went wrong, " + anime.get('anime_title') + " was not saved.";
				console.log(msg);
				Notify.warning(msg);
			};

			anime.save().then(onSuccess, onFailure);
		},
	},

	// Select required properties 
	// TODO: put these in the database preferably
	anime_types: [
		"TV",
		"OVA",
		"Movie",
		"Special",
		"ONA",
	],
	anime_statuses: [
		"On-going",
		"Complete",
		"Not Yet Aired"
	],
	anime_versions: [
		"Subbed",
		"Dubbed"
	],
	age_ratings: [
		"NR - Not Rated",
		"G - All Ages",
		"PG - Children",
		"PG-13 - Teens 13 or older",
		"R - 17+ (violence & profanity)",
		"R+ - Mild Nudity",
	],
});
