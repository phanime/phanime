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
	this.route('userLibrary', {path: '/users/:username/library', layoutTemplate: 'userProfileLayout'});
	this.route('userFollowers', {path: '/users/:username/followers', layoutTemplate: 'userProfileLayout'});
	this.route('userFollowing', {path: '/users/:username/following', layoutTemplate: 'userProfileLayout'});
	this.route('userActivity', {path: '/users/:username/activity', layoutTemplate: 'userProfileLayout'});


	/////////////////////////////////////////////////
	///////////////////// User //////////////////////
	/////////////////////////////////////////////////

	this.route('accountPersonalDetails', {path: '/account/personal-details', layoutTemplate: 'accountLayout'});
	this.route('accountSecurity', {path: '/account/security', layoutTemplate: 'accountLayout'});
	this.route('accountPreferences', {path: '/account/preferences', layoutTemplate: 'accountLayout'});




	/////////////////////////////////////////////////
	//////////////////// General ////////////////////
	/////////////////////////////////////////////////

	// Search

	this.route('search', {path: 'search'});

	// Related routes

	this.route('signIn', {path: 'sign-in'});
	this.route('signOut', {path: 'sign-out'});
	this.route('signUp', {path: 'sign-up'});

	// Discourse community sso auth medium
	this.route('communitySSO', {path: '/community/sso'});


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
			Router.go('signIn');
		}
	},

	isAlreadyLoggedIn: function(pause) {
		if (Meteor.user()) {
			Router.go('index');
		}
	},

	isAdmin: function(pause) {
		if (!(Meteor.loggingIn() || Meteor.user().isAdmin())) {
			this.render('permissionDenied');
			pause();
		}
	}, 

	landingPage: function(pause) {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			this.render('landing');
			pause();
		}		
	},

	// remove the search template / set sesion variable to false
	removeSearch: function(pause) {
		Session.set('isSearchingGlobal', false);
	},

	// We want to ensure that when a new page loads
	// we have it scrolled all the way to the top
	scrollUp: function() {
		$('body, html').scrollTop(0);
	},
	animateContentIn: function() {
		$('.container.main-content').addClass("animated fadeIn fateInRight");
		$('footer').removeClass("hide");
	}
};


var routerOnStopHooks = {
	// remove the search template / set sesion variable to false
	removeSearch: function(pause) {
		Session.set('isSearchingGlobal', false);
	}	
}


// Run these global routes first
Router.onBeforeAction('loading');
Router.onBeforeAction(routerBeforeHooks.isLoggedIn, {except: ['signIn', 'signUp', 'index', 'communitySSO']});
// If the user is already logged in, then they shouldn't be able to visit the signIn or signUp pages
Router.onBeforeAction(routerBeforeHooks.isAlreadyLoggedIn, {only: ['signIn', 'signUp']});

// Render the landing page if the user isn't logged in on index
Router.onBeforeAction(routerBeforeHooks.landingPage, {only: ['index']});

// Router.onBeforeAction(routerBeforeHooks.removeSearch);

// These routes need admin permissions 
Router.onBeforeAction(routerBeforeHooks.isAdmin, {only: ['animeAdd', 'charactersAdd', 'peopleAdd', 'studiosAdd', 'staffMembersAdd', 'castingsAdd']});

// Removes the search right before the route changes (typically)
Router.onStop(routerOnStopHooks.removeSearch);

// Router.onBeforeAction('dataNotFound');

// Global hooks that every page needs
// Router.onBeforeAction(routerBeforeHooks.loadingIndicator, routerBeforeHooks.isLoggedIn, routerBeforeHooks.scrollUp);

Router.configure({
	layoutTemplate: 'defaultLayout',
	// notFoundTemplate: 'fourOhFour',
	loadingTemplate: 'loading',
	waitOn: function () {
		if (Meteor.user()) {
			return Meteor.subscribe('userAlerts');
		}
	}
});