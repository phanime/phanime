import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	cover_image: null,

	cover_image_url: function() {
		return "http://cdn.phanime.com/images/anime/cover/" + this.get('cover_image');
	}.property('cover_image'),
	canonical_title: null,
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
	selectedGenres: null,

	actions: {
		addAnime: function() {
			var store = this.store;
			var self = this;
			console.log(this.get('session.currentUser.data'));

			// Some shitty validation for now 
			if (!this.get('canonical_title')) {
				Notify.warning('Please enter in an anime title');
				return; 
			}

			var anime = store.createRecord('anime', {
				cover_image: this.get('cover_image'),
				canonical_title: this.get('canonical_title').trim(),
				romaji_title: this.get('romaji_title').trim(),
				japanese_title: this.get('japanese_title').trim(),
				type: this.get('type').trim(),
				episode_duration: this.get('episode_duration').trim(),
				season_number: this.get('season_number').trim(),
				start_date: this.get('start_date').trim(),
				slug: this.get('slug').trim(),
				english_title: this.get('english_title').trim(),
				status: this.get('status').trim(),
				age_rating: this.get('age_rating').trim(),
				total_episodes: this.get('total_episodes').trim(),
				end_date: this.get('end_date').trim(),
				description: this.get('description'),
				version: this.get('version').trim(),
				title_synonyms: this.get('title_synonyms').trim(),
			});

			var onSuccess = function(anime) {

				var msg = anime.get('title') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				self.transitionToRoute('anime', anime);
			};

			var onFailure = function(response) {
				var msg;

				if (response.message) {
					msg = response.message;
				} else {

					msg = "Something went wrong, anime was not added.";

				}

				console.log(msg);
				Notify.warning(msg);
			};

			anime.get('genres').then(function(genres) {
				console.log(self.get('selectedGenres'));
				genres.pushObjects(self.get('selectedGenres'));
				anime.save().then(onSuccess, onFailure);
			});

			
		},
		filesUploaded: function(data) {
			this.set('cover_image', data.name[0].name);
			console.log(this.get('cover_image_url'));
			console.log(data.name[0].name);
			console.log(this.get('cover_image'));
		},
	},


	titleChanged: function() {
		var slug = this.get('canonical_title').replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
		slug = slug.replace(/\s+/g, '-');

		// Set the the anime slug
		this.set('slug', slug);

		//console.log(slug);

	}.observes('canonical_title'),


	// Select required properties 
	// TODO: put these in the database preferably
	all_genres: function() {
		return this.store.find('genre');
	}.property(),
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
