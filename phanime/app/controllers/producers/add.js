import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	name: null,
	slug: null,
	description: null,
	producer_logo: null,

	producer_logo_url: function() {
		return "http://cdn.phanime.com/images/producers/cover/" + this.get('producer_logo');
	}.property('producer_logo'),

	actions: {
		add_producer: function() {

			var store = this.store;
			var self = this;

			// Some shitty validation, real validation on the server
			if (!this.get('name')) {
				Notify.warning('Please ensure the name of the producer is filled out.');
				return;
			}

			// Temporary way to convert empty string into null
			if (!this.get('description')) {
				this.set('description', null);
			}

			var producer = store.createRecord('producer', {
				producer_logo: this.get('producer_logo'),
				name: this.get('name').trim(),
				slug: this.get('slug'),
				description: this.get('description'),
			});


			var onSuccess = function(producer) {

				var msg = producer.get('name') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				//self.transitionTo('producer', producer);
			};

			var onFailure = function(response) {

				var msg;
				
				if (response.message) {
					msg = response.message;
				} else {
					msg = "Something went wrong, producer was not added.";
				}

				console.log(msg);
				Notify.warning(msg);
			};

			producer.get('anime').then(function(anime) {
				anime.pushObjects(self.get('selectedAnime'));
				producer.save().then(onSuccess, onFailure);
			});


		},
		trigger_search_anime: function() {
			var store = this.store;

			var search_results = store.filter('anime', { query: this.get('search_text_anime') }, function(anime) {
				console.log(anime);
				return 1;
				// return (anime.get('title').toLowerCase().indexOf(this.get('search_text_anime').toLowerCase()) > -1);
			});		

			this.set('anime_results', search_results);

			return false;
		},
		select_anime: function(anime) {
			var prev_selected = this.get('selectedAnime');

			if (!prev_selected.contains(anime)) {
				prev_selected.pushObject(anime);
			}

			this.set('selectedAnime', prev_selected);
		},
		filesUploaded: function(data) {
			this.set('producer_logo', data.name[0].name);
			console.log(this.get('producer_logo_url'));
			console.log(data.name[0].name);
			console.log(this.get('producer_logo'));
		}
	},
	nameChanged: function() {
		var slug = this.get('name').replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
		slug = slug.replace(/\s+/g, '-');

		// Set the the anime slug
		this.set('slug', slug);

		console.log(slug);

	}.observes('name'),

	// Search anime
	search_text_anime: '',
	anime_results: '',
	selectedAnime: [],
	init_selected_anime: function() {
		this.set('selectedAnime', []);
	}.on('init'),
});
