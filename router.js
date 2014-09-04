Router.map(function () {

	this.route('index', {path: '/', template: 'index', layoutTemplate: 'indexLayout'});

	/////////////////////////////////////////////////
	///////////////////// Anime /////////////////////
	/////////////////////////////////////////////////

	// Defined for compatibilty with pages 
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
	/////////////////// Castings ////////////////////
	/////////////////////////////////////////////////
	this.route('castingsAdd', {path: 'castings/add'});

	/////////////////////////////////////////////////
	///////////////// staffMembers //////////////////
	/////////////////////////////////////////////////
	this.route('staffMembersAdd', {path: 'staff-members/add'});

	/////////////////////////////////////////////////
	/////////////////// Reviews /////////////////////
	/////////////////////////////////////////////////

	this.route('review', {path: '/anime/:slug/reviews/:_id'});

	/////////////////////////////////////////////////
	///////////////////// User //////////////////////
	/////////////////////////////////////////////////

	this.route('user', {path: '/users/:username', layoutTemplate: 'userProfileLayout'});
	this.route('userLibrary', {path: '/users/:username/library', layoutTemplate: 'userProfileLayout'})

	/////////////////////////////////////////////////
	//////////////////// General ////////////////////
	/////////////////////////////////////////////////

	// Search

	this.route('search', {path: 'search'});

	// Related routes

	this.route('signIn', {path: 'sign-in'});
	this.route('signOut', {path: 'sign-out'});
	this.route('signUp', {path: 'sign-up'});


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
	},

	loadingIndicator: function() {
		this.render('loading');
	},

	// We want to ensure that when a new page loads
	// we have it scrolled all the way to the top
	scrollUp: function() {
		$('body, html').scrollTop(0);
	},

	animateContentOut: function() {
		$('#content').removeClass("animated fadeIn fadeInRight");
		$('footer').addClass("hide");
	}
}

// (Global) Before hooks for any route
Router.onBeforeAction(routerBeforeHooks.landingPage, {only: ['index']});
Router.onBeforeAction(routerBeforeHooks.loadingIndicator,routerBeforeHooks.isLoggedIn, routerBeforeHooks.scrollUp);

Router.configure({
	layoutTemplate: 'defaultLayout'
});


// // Before hooks for specific routes
// // Must be equal to the route names of the Iron Router route map
// Router.before(IR_BeforeHooks.isLoggedIn, {only: ['userAreaA', 'userAreaB']});