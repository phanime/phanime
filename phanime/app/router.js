import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PhanimeENV.locationType
});

Router.map(function() {

	// Anime related routes
	this.route('anime-list', {path: '/anime'});

	this.route('anime-add', {path: '/anime/add'});

	this.resource('anime', {path: 'anime/:slug'}, function() {
		// this.resource('episode', {path: '/episode/:episode_number'}, function() {
		// 	this.resource('video', { path: ':video_id' });
		// });
		this.route('add');
	});

	// Character related routes
	this.resource('characters', function() {
		this.route('add');
	});

	this.resource('character', { path: 'characters/:character_id/:character_slug' });

	// Producer related routes
	this.resource('producers', function() {
		this.route('add');
	});

	this.resource('producer', { path: 'producers/:producer_id/:producer_slug' });

	// Person related routes
	this.resource('people', function() {
		this.route('add');
	});

	this.resource('person', { path: 'people/:person_id/:person_slug' });
	

	// Casting related routes
	this.resource('castings', function() {
		this.route('add');
	});

	// staffMember related routes
	this.resource('staffMembers', {path: 'staff-members'}, function() {
		this.route('add');
	});


	this.resource('account', function() {
		this.route('personalDetails', {path :'personal-details'});
		this.route('security');
		this.route('preferences');
	});

	// Users related routes
	this.resource('user', { path: 'users/:username' }, function() {
		this.route('library');
	});

	// Search

	this.route('search', {path: 'search/:query'});

	// Login

	this.route('login');


	// 404 not found route

	this.route('fourOhFour', {path: "*path"});

});

export default Router;
