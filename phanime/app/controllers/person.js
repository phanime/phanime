import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	isEditing: false,

	actions: {
		saveChanges: function(person) {


			var onSuccess = function(person) {

				var msg = person.get('first_name') + " " + person.get('last_name') + " was successfully saved.";
				console.log(msg);
				Notify.success(msg);
			};

			var onFailure = function() {
				var msg = "Something went wrong, person was not updated.";
				console.log(msg);
				Notify.warning(msg);
			};

			person.save().then(onSuccess, onFailure);

		},
		toggleEditing: function() {
			this.toggleProperty('isEditing');
		}
	},

	// Genders
	genders: [
		"",
		"Male",
		"Female",
	],

	// Blood types
	blood_types: [
		"",
		"A",
		"B",
		"AB",
		"O",
	]
});
