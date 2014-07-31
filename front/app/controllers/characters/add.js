import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	cover_photo: null,
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

			var character = store.createRecord('character', {
				cover_photo: '',
				first_name: this.get('first_name'),
				last_name: this.get('last_name'),
				japanese_name: this.get('japanese_name'),
				alternate_name: this.get('alternate_name'),
				gender: this.get('gender'),
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
		}
	},

	cover_photo_url: function() {
		return "http://cdn.phanime.com/images/" + this.get('cover_photo');
	}.property('cover_photo'),
	// Genders
	genders: [
		"",
		"Male",
		"Female",
	]
});
