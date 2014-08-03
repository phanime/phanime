import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	isEditing: false,

	actions: {
		saveChanges: function(character) {


			var onSuccess = function(character) {

				var msg = character.get('first_name') + " " + character.get('last_name') + " was successfully saved.";
				console.log(msg);
				Notify.success(msg);
			};

			var onFailure = function() {
				var msg = "Something went wrong, character was not updated.";
				console.log(msg);
				Notify.warning(msg);
			};

			character.save().then(onSuccess, onFailure);

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
	]
});
