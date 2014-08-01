import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('username');
	},
	title: function(tokens) {
		return tokens[0] + this.get('settings.urlSeparator') + this.get('settings.siteName');
	},
	model: function(params) {
		return this.store.find('user', {username: params.username}).then(function(data) {
			return data.get('firstObject');
		});
	},
	serialize: function(user) {
		return { username: user.get('username') };
	},	
});
