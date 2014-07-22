import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	cover_photo: null,
	first_name: null,
	last_name: null,
	given_name: null,
	family_name: null,
	gender: null,
	birth_date: null,
	website: null,
	birth_place: null,
	blood_type: null,
	other_info: null,
	actions: {
		add_person: function() {

			var store = this.store;
			//var self = this;

			var character = store.createRecord('character', {
				cover_photo: '',
				first_name: this.get('first_name'),
				last_name: this.get('last_name'),
				given_name: this.get('given_name'),
				family_name: this.get('family_name'),
				gender: this.get('gender'),
				birth_date: this.get('birth_date'),
				website: this.get('website'),
				birth_place: this.get('birth_place'),
				blood_type: this.get('blood_type'),
				other_info: this.get('other_info'),
			});


			var onSuccess = function(character) {

				var msg = character.get('first_name') + " " + character.get('last_name') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				//self.transitionTo('character', character);
			};

			var onFailure = function(character) {
				var msg = "Something went wrong, " + character.get('first_name') + " " + character.get('last_name') + " was not added.";
				console.log(msg);
				Notify.warning(msg);
			};

			character.save().then(onSuccess, onFailure);

		}
	},
	// Genders
	genders: [
		"",
		"Male",
		"Female",
	]
});