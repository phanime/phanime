import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	isEditing: false,
	isAdding: false,
	titleChanged: function() {
		var slug = this.get('model.anime_title').replace(/\s+/g, '-').toLowerCase();
		// Set the the anime slug
		this.set('model.anime_slug', slug);

	}.observes('model.anime_title'),

	actions: {
		edit: function() {
			this.toggleProperty('isEditing');
			// Set the other property to false
			console.log(this.get('session.currentUser.data'));
			this.set('isAdding', false);
		},
		toggle_ep_add: function() {
			this.toggleProperty('isAdding');
			// Set the other property to false 
			this.set('isEditing', false);
		},
		save_changes: function(anime) {

			Notify.useBootstrap();

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
		add_episode: function() {
			//var store = this.store;

			// store.createRecord('episode', {
			// 	anime_id: this.get('model.id');
			// 	user_id: this.get('')
			// 	episode_name

			// });

			console.log(this.get('c_episode_name'));
		},
	},

	// Episode properties (to hold when creating episode) Prefix with c to not have any conflicts with other variables (c = create)
	c_episode_name: function() {
		var anime_title, anime_type, episode_number;

		if (this.get('model.anime_type') === 'TV') {
			anime_type = 'Episode';
		} else {
			anime_type = this.get('model.anime_type');
		}

		anime_title = this.get('model.anime_title');
		episode_number = this.get('c_episode_number');

		var episode_name = anime_title + " Online " + anime_type + " " + episode_number;
		console.log(episode_name);
		return episode_name;

	}.property('c_episode_number', 'model.anime_title', 'model.anime_type'),
	c_episode_multiple: false,
	c_episode_number: null, // Is a number
	c_episode_number_other: null,
	c_episode_title: null,
	c_episode_air_date: null,
	c_episode_already_aired: false,
	c_episode_version: [], 

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
