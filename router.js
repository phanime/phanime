Router.map(function () {

	this.route('index', {path: '/', template: 'index', layoutTemplate: 'indexLayout'});

	// Anime related routes
	this.route('animeExplore', {path: '/anime/explore', layoutTemplate: 'defaultLayout'});

	this.route('animeAdd', {path: '/anime/add'});

	this.route('anime', {path: '/anime/:slug', layoutTemplate: 'defaultLayout'});


	// Character related routes

	this.route('characters', {layoutTemplate: 'defaultLayout'});
	this.route('character', {path: 'characters/:_id/:fullNameSlug', layoutTemplate: 'defaultLayout'});


	// People related routes

	this.route('people', {layoutTemplate: 'defaultLayout'});
	this.route('person', {path: '/people/:_id/:fullNameSlug', layoutTemplate: 'defaultLayout'});


	// User related routes
	this.route('user', {path: '/users/:username', layoutTemplate: 'defaultLayout'});
	this.route('userLibrary', {path: '/users/:username/library', layoutTemplate: 'defaultLayout'})

	// Search

	this.route('search', {path: 'search/:query'});

	// Login

	this.route('login', {layoutTemplate: 'defaultLayout'});


	// 404 not found route

	this.route('fourOhFour', {path: "*path"});

});

////////////////
// BeforeHooks
////////////////
// I use an object that contains all before hooks
var routerBeforeHooks = {
	isLoggedIn: function(pause) {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			this.render('login');
			pause();
		}
	},
	landingPage: function(pause) {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			this.render('landing');
			pause();
		}		
	}
}

// (Global) Before hooks for any route
Router.onBeforeAction(routerBeforeHooks.landingPage, {only: ['index']});
Router.onBeforeAction(routerBeforeHooks.isLoggedIn);


// // Before hooks for specific routes
// // Must be equal to the route names of the Iron Router route map
// Router.before(IR_BeforeHooks.isLoggedIn, {only: ['userAreaA', 'userAreaB']});