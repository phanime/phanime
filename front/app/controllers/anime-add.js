import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	romaji_title: null,
	japanese_title: null,
	type: null,
	episode_duration: null,
	season_number: null,
	start_date: null,
	slug: null,
	english_title: null,
	status: null,
	age_rating: null,
	total_episodes: null,
	end_date: null,
	description: null,
	version: null,
	title_synonyms: null,

	actions: {
		addAnime: function() {
			var store = this.store;
			var self = this;
			console.log(this.get('session.currentUser.data'));
			var anime = store.createRecord('anime', {
				user_id: this.get('session.currentUser.data'),
				cover_image: this.get('session.currentUser'),
				romaji_title: this.get('romaji_title'),
				japanese_title: this.get('japanese_title'),
				type: this.get('type'),
				episode_duration: this.get('episode_duration'),
				season_number: this.get('season_number'),
				start_date: this.get('start_date'),
				slug: this.get('slug'),
				english_title: this.get('english_title'),
				status: this.get('status'),
				age_rating: this.get('age_rating'),
				total_episodes: this.get('total_episodes'),
				end_date: this.get('end_date'),
				description: this.get('description'),
				version: this.get('version'),
				title_synonyms: this.get('title_synonyms'),
			});


			var onSuccess = function(anime) {

				var msg = anime.get('title') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				self.transitionToRoute('anime', anime);
			};

			var onFailure = function() {
				var msg = "Something went wrong, anime was not added.";
				console.log(msg);
				Notify.warning(msg);
			};

			anime.save().then(onSuccess, onFailure);			
		}
	},


	titleChanged: function() {
		var slug = this.get('romaji_title').replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
		slug = slug.replace(/\s+/g, '-');

		// Set the the anime slug
		this.set('slug', slug);

		console.log(slug);

	}.observes('romaji_title'),


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
