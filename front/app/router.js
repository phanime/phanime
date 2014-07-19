import Ember from 'ember';

var Router = Ember.Router.extend({
  location: FrontENV.locationType
});

Router.map(function() {

	// Anime related routes
	this.route('anime-list', {path: '/anime'});

	this.resource('anime', {path: 'anime/:slug'}, function() {
		this.resource('episode', {path: '/episode/:episode_number'}, function() {
			this.resource('video', { path: ':video_id' });
		});
	});

	// Character related routes
	this.resource('characters', function() {
		this.resource('character', { path: ':character_id/:first_name-:last_name' });
		this.route('add');
	});

	// Producer related routes
	this.resource('producers', function() {
		this.resource('producer', { path: ':producer_id/:producer_slug' });
		this.route('add');
	});

	// Person related routes
	this.resource('people', function() {
		this.resource('person', { path: ':person_id/:first_name-:last_name' });
		this.route('add');
	});




	// Users related routes
	this.resource('user', { path: 'users/:username' });

	this.route('login');

	this.route('fourOhFour', {path: "*path"});
});

Router.reopen({
	location: 'history',
});

export default Router;
