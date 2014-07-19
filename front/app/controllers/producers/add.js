import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	name: null,
	slug: null,
	description: null,
	producer_logo: null,
	actions: {
		add_producer: function() {
			var store = this.store;
			var producer = store.createRecord('producer', {
				producer_logo: '',
				name: this.get('name'),
				slug: this.get('slug'),
				description: this.get('description'),
			});

			var self = this;

			var onSuccess = function(producer) {
				console.log('did it get called?');
				var msg = producer.get('name') + " was successfully added.";
				console.log(msg);
				Notify.success(msg);
				//self.transitionTo('producer', producer);
			};

			var onFailure = function(producer) {
				console.log('Failed');
				var msg = "Something went wrong, " + producer.get('name') + " was not added.";
				console.log(msg);
				Notify.warning(msg);
			};


			producer.save().then(onSuccess, onFailure);

		}
	},
	nameChanged: function() {
		var slug = this.get('name').replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
		slug = slug.replace(/\s+/g, '-');

		// Set the the anime slug
		this.set('slug', slug);

		console.log(slug);

	}.observes('name'),
});
