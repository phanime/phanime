import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FrontENV.locationType
});

Router.map(function() {
	this.route('anime-list', {path: '/anime'});

		this.resource('anime', {path: 'anime/:anime_slug'}, function() {
			this.resource('episode', {path: '/episode/:episode_number'}, function() {
				this.resource('video', { path: ':video_id' });
			});
		});

	this.route('login');
});

Router.reopen({
	location: 'history',
});

export default Router;
