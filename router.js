Router.map(function () {

	this.route('index', {path: '/', template: 'index', layoutTemplate: 'indexLayout'});

	/////////////////////////////////////////////////
	///////////////////// Anime /////////////////////
	/////////////////////////////////////////////////

	this.route('animeExplore', {path: '/anime/explore'});

	this.route('animeAdd', {path: '/anime/add'});

	this.route('anime', {path: '/anime/:slug'});

	/////////////////////////////////////////////////
	////////////////// Character ////////////////////
	/////////////////////////////////////////////////

	this.route('characters');
	this.route('character', {path: 'characters/:_id/:fullNameSlug'});
	this.route('charactersAdd', {path: 'characters/add'});


	/////////////////////////////////////////////////
	//////////////////// People /////////////////////
	/////////////////////////////////////////////////

	this.route('people', {layoutTemplate: 'defaultLayout'});
	this.route('person', {path: '/people/:_id/:fullNameSlug'});
	this.route('peopleAdd', {path: 'people/add'});

	/////////////////////////////////////////////////
	//////////////////// Studios ////////////////////
	/////////////////////////////////////////////////
	this.route('studiosAdd', {path: 'studios/add'});


	/////////////////////////////////////////////////
	///////////////////// User //////////////////////
	/////////////////////////////////////////////////

	this.route('user', {path: '/users/:username', layoutTemplate: 'userProfileLayout'});
	this.route('userLibrary', {path: '/users/:username/library', layoutTemplate: 'userProfileLayout'})

	/////////////////////////////////////////////////
	//////////////////// General ////////////////////
	/////////////////////////////////////////////////

	// Search

	this.route('search', {path: 'search/:query'});

	// Login

	this.route('login');


	// 404 not found route

	this.route('fourOhFour', {path: "*"});

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

Router.configure({
	layoutTemplate: 'defaultLayout'
});


// // Before hooks for specific routes
// // Must be equal to the route names of the Iron Router route map
// Router.before(IR_BeforeHooks.isLoggedIn, {only: ['userAreaA', 'userAreaB']});