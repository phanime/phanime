import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	cover_photo: null,

	cover_photo_url: function() {
		return "http://cdn.phanime.com/images/characters/cover/" + this.get('cover_photo');
	}.property('cover_photo'),

	first_name: null,
	last_name: null,
	japanese_name: null,
	alternate_name: null,
	gender: null,
	biography: null,
	actions: {
		add_character: function() {

			var store = this.store;
			var self = this;

			// Some shitty validation for now (more validation on the server side)
			if (!this.get('first_name')) {
				Notify.warning('Please ensure that the first name is filled out.');
				return;
			}

			var character = store.createRecord('character', {
				cover_photo: this.get('cover_photo'),
				first_name: this.get('first_name').trim(),
				last_name: this.get('last_name').trim(),
				japanese_name: this.get('japanese_name').trim(),
				alternate_name: this.get('alternate_name').trim(),
				gender: this.get('gender').trim(),
				biography: this.get('biography'),
			});


			var onSuccess = function(character) {

				var msg = character.get('first_name') + " " + character.get('last_name') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				self.transitionToRoute('character', character);
			};

			var onFailure = function() {
				var msg = "Something went wrong, character was not added.";
				console.log(msg);
				Notify.warning(msg);
			};

			character.save().then(onSuccess, onFailure);

		},
		filesUploaded: function(data) {
			this.set('cover_photo', data.name[0].name);
			console.log(this.get('cover_photo_url'));
			console.log(data.name[0].name);
			console.log(this.get('cover_photo'));
		}
	},

	// Genders
	genders: [
		"",
		"Male",
		"Female",
	]
});
