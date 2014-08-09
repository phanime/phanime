import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	cover_photo: null,


	cover_photo_url: function() {
		return "http://cdn.phanime.com/images/people/cover/" + this.get('cover_photo');
	}.property('cover_photo'),

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
			var self = this;

			// Some shitty validation for now (more validation on the server side)
			if (!this.get('first_name') || !this.get('last_name') || !this.get('gender')) {
				Notify.warning('Please ensure that first name, last name and gender is filled out.');
				return;
			}

			var person = store.createRecord('person', {
				cover_photo: this.get('cover_photo'),
				first_name: this.get('first_name').trim(),
				last_name: this.get('last_name').trim(),
				given_name: this.get('given_name'),
				family_name: this.get('family_name'),
				gender: this.get('gender'),
				birth_date: this.get('birth_date'),
				website: this.get('website'),
				birth_place: this.get('birth_place'),
				blood_type: this.get('blood_type'),
				other_info: this.get('other_info'),
			});


			var onSuccess = function(person) {

				var msg = person.get('first_name') + " " + person.get('last_name') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				self.transitionTo('person', person);
			};

			var onFailure = function(response) {

				var msg;

				if (response.message) {
					msg = response.message; 
				} else {
					msg = "Something went wrong, person was not added.";
				}

				console.log(msg);
				Notify.warning(msg);
			};

			person.save().then(onSuccess, onFailure);

		},
		filesUploaded: function(data) {
			this.set('cover_photo', data.name[0].name);
			console.log(this.get('cover_photo_url'));
			//console.log(data.name[0].name);
			console.log(this.get('cover_photo'));
		}
	},
	// Genders
	genders: [
		"Male",
		"Female",
	],
	blood_types: [
		null,
		"A",
		"B",
		"AB",
		"O",
	]
});