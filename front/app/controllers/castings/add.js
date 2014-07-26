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
				language: this.get('language'),
				role: this.get('role'),
				person_id: this.get('selectedPerson'),
				character_id: this.get('selectedCharacter'),
				anime_id: this.get('selectedAnime'),
			});


			var onSuccess = function(casting) {

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

		}
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
});
