import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	language: null,
	role: null,

	actions: {
		addCasting: function() {

			var store = this.store;
			//var self = this;

			var casting = store.createRecord('casting', {
				language: this.get('language').trim(),
				role: this.get('role').trim(),
				person_id: this.get('selectedPerson'),
				character_id: this.get('selectedCharacter'),
				anime_id: this.get('selectedAnime'),
			});


			var onSuccess = function() {

				var msg = "Casting was successfully added to anime";
				console.log(msg);
				Notify.success(msg);
				//self.transitionTo('character', character);
			};

			var onFailure = function() {
				var msg = "Something went wrong, casting was not added.";
				console.log(msg);
				Notify.warning(msg);
			};

			casting.save().then(onSuccess, onFailure);

		},
		searchAnime: function() {
			var store = this.store;

			var search_results = store.filter('anime', { query: this.get('searchTextAnime') }, function(anime) {
				console.log(anime);
				return 1;
				// return (anime.get('title').toLowerCase().indexOf(this.get('search_text_anime').toLowerCase()) > -1);
			});		

			this.set('animeResults', search_results);

			// To ensure the event doesn't bubble up
			return false;
		},
		searchPerson: function() {
			var store = this.store;

			var search_results = store.filter('person', { query: this.get('searchTextPerson') }, function(person) {
				console.log(person);
				return 1;
				// return (anime.get('title').toLowerCase().indexOf(this.get('search_text_anime').toLowerCase()) > -1);
			});		

			this.set('personResults', search_results);

			// To ensure the event doesn't bubble up
			return false;
		},
		searchCharacter: function() {
			var store = this.store;

			var search_results = store.filter('character', { query: this.get('searchTextCharacter') }, function(character) {
				console.log(character);
				return 1;
				// return (anime.get('title').toLowerCase().indexOf(this.get('search_text_anime').toLowerCase()) > -1);
			});		

			this.set('characterResults', search_results);

			// To ensure the event doesn't bubble up
			return false;
		},
		selectAnime: function(anime) {
			this.set('selectedAnime', anime);
		},

		selectPerson: function(person) {
			this.set('selectedPerson', person);
		},

		selectCharacter: function(character) {
			this.set('selectedCharacter', character);
		},
	},

	// Search anime
	searchTextAnime: '',
	animeResults: '',
	selectedAnime: null,

	// Search Person
	searchTextPerson: '',
	personResults: '',
	selectedPerson: null,

	// Search Character
	searchTextCharacter: '',
	characterResults: '',
	selectedCharacter: null,

	roles: [
		"Main",
		"Supporting"
	],

	languages: [
		"Japanese",
		"English",
		"Korean",
		"Spanish",
		"German",
		"French",
		"Brazilian",
		"Italian",
		"Hungarian",
		"Hebrew"
	],
});