import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	search_query: null,
	actions: {
		trigger_search: function() {
			this.transitionTo('search', this.get('search_query'));
		}
	}
});
