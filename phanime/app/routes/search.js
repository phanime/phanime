import Ember from 'ember';

export default Ember.Route.extend({
	title: function() {
		return "Search" + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},

	model: function(params) {
		var store = this.store;
		return store.filter('anime', { search: params.query }, function(anime) {
			return (anime.get('title').toLowerCase().indexOf(params.query.toLowerCase()) > -1);
		});	
		//return this.store.find('anime', {search: params.query});
	}

});
