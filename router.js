Router.map(function () {

	this.route('index', {path: '/', layoutTemplate: 'indexLayout'});

	this.route('dashboard');

	/////////////////////////////////////////////////
	///////////////////// Anime /////////////////////
	/////////////////////////////////////////////////

	// Defined for compatibilty with pages
	this.route('animeExplore', {path: '/anime/explore'});
	this.route('anime', {path: '/anime/:_id/:slug'});

	/////////////////////////////////////////////////
	////////////////// Character ////////////////////
	/////////////////////////////////////////////////

	this.route('characters');
	this.route('character', {path: 'characters/:_id/:fullNameSlug'});
	// Add will be moved to revisions/characters/add


	/////////////////////////////////////////////////
	//////////////////// People /////////////////////
	/////////////////////////////////////////////////

	this.route('people', {layoutTemplate: 'defaultLayout'});
	this.route('person', {path: '/people/:_id/:fullNameSlug'});
	// Add will be moved to revisions/people/add

	/////////////////////////////////////////////////
	//////////////////// Studios ////////////////////
	/////////////////////////////////////////////////
	// Add will be moved to revisions/studios/add

	/////////////////////////////////////////////////
	/////////////////// Castings ////////////////////
	/////////////////////////////////////////////////
	// Add will be moved inside another add

	/////////////////////////////////////////////////
	///////////////// staffMembers //////////////////
	/////////////////////////////////////////////////
	// Add will be moved inside another add



	/////////////////////////////////////////////////
	///////////////// customLists ///////////////////
	/////////////////////////////////////////////////
	this.route('customList', {path: '/custom-lists/:_id/:slug'});
	this.route('customListEdit', {path: '/custom-lists/:_id/:slug/edit'});
	this.route('customListsCreate', {path: '/custom-lists/create'});

	/////////////////////////////////////////////////
	/////////////////// Reviews /////////////////////
	/////////////////////////////////////////////////

	this.route('animeReview', {path: '/anime/:animeId/:slug/reviews/:_id'});

	/////////////////////////////////////////////////
	///////////////////// User //////////////////////
	/////////////////////////////////////////////////

	this.route('user', {path: '/users/:username', layoutTemplate: 'userProfileLayout'});
	this.route('userLibrary', {path: '/users/:username/library', layoutTemplate: 'userProfileLayout'});
	this.route('userFollowers', {path: '/users/:username/followers', layoutTemplate: 'userProfileLayout'});
	this.route('userFollowing', {path: '/users/:username/following', layoutTemplate: 'userProfileLayout'});
	this.route('userActivity', {path: '/users/:username/activity', layoutTemplate: 'userProfileLayout'});
	this.route('userCustomLists', {path: '/users/:username/custom-lists', layoutTemplate: 'userProfileLayout'});


	/////////////////////////////////////////////////
	//////////////// Profile Post ///////////////////
	/////////////////////////////////////////////////
	this.route('profilePost', {path: 'profile-post/:_id'});


	/////////////////////////////////////////////////
	/////////////////// Account /////////////////////
	/////////////////////////////////////////////////

	this.route('accountPersonalDetails', {path: '/account/personal-details', layoutTemplate: 'accountLayout'});
	this.route('accountSecurity', {path: '/account/security', layoutTemplate: 'accountLayout'});
	this.route('accountPreferences', {path: '/account/preferences', layoutTemplate: 'accountLayout'});
	this.route('accountImports', {path: '/account/imports', layoutTemplate: 'accountLayout'});

	/////////////////////////////////////////////////
	/////////////////// Revisions ///////////////////
	/////////////////////////////////////////////////

	this.route('revisionsAnimeAdd', {path: 'revisions/anime/add'});


	/////////////////////////////////////////////////
	/////////////////// Moderator ///////////////////
	/////////////////////////////////////////////////

	this.route('revisionsQueue', {path: 'moderator/revision-queue'});


	/////////////////////////////////////////////////
	//////////////////// General ////////////////////
	/////////////////////////////////////////////////

	// Search

	this.route('search', {path: 'search'});

	// Related routes


	this.route('signIn', {path: 'sign-in'});
	this.route('signOut', {path: 'sign-out'});
	this.route('signUp', {path: 'sign-up'});
	this.route('forgotPassword', {path: 'forgot-password'});
	this.route('resetPassword', {path: 'reset-password/:token'});

	this.route('verifyEmail', {path: 'verify-email'});

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
	logPageViews: function() {
		GAnalytics.pageview();
		this.next();
	},

	isLoggedIn: function() {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			Router.go('signIn');
		} else {
			this.next();
		}
	},

	isAlreadyLoggedIn: function() {
		if (Meteor.user()) {
			Router.go('index');
		} else {
			this.next();
		}
	},

	isAdmin: function() {
		if (!(Meteor.loggingIn() || Meteor.user().isAdmin())) {
			this.render('permissionDenied');
		} else {
			this.next();
		}
	},
	isModerator: function() {
		if (!(Meteor.loggingIn() || Meteor.user().isModerator())) {
			this.render('permissionDenied');
		} else {
			this.next();
		}
	},
	landingPage: function() {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			this.render('landing');
		} else {
			this.next();
		}
	},

	// remove the search template / set sesion variable to false
	removeSearch: function() {
		Session.set('isSearchingGlobal', false);
		this.next();
	},

	// We want to ensure that when a new page loads
	// we have it scrolled all the way to the top
	scrollUp: function() {
		$('body, html').scrollTop(0);
		this.next();
	},
	animateContentIn: function() {
		$('.container.main-content').addClass("animated fadeIn fateInRight");
		$('footer').removeClass("hide");
		this.next();
	}
};


var routerOnStopHooks = {
	// remove the search template / set sesion variable to false
	removeSearch: function() {
		Session.set('isSearchingGlobal', false);
	}
}


// Run these global routes first
Router.onBeforeAction('loading');

// Log page views
Router.onBeforeAction(routerBeforeHooks.logPageViews);

// These routes require login
Router.onBeforeAction(routerBeforeHooks.isLoggedIn, {only: ['dashboard', 'accountPersonalDetails', 'accountPreferences', 'accountSecurity', 'accountImports', 'revisionsAnimeAdd', 'revisionsQueue', 'customListsCreate', 'customListEdit']});

// If the user is already logged in, then they shouldn't be able to visit the following routes
Router.onBeforeAction(routerBeforeHooks.isAlreadyLoggedIn, {only: ['signIn', 'signUp', 'forgotPassword', 'resetPassword']});

// Render the landing page if the user isn't logged in on index
Router.onBeforeAction(routerBeforeHooks.landingPage, {only: ['index']});

// Router.onBeforeAction(routerBeforeHooks.removeSearch);

// These routes need admin permissions
Router.onBeforeAction(routerBeforeHooks.isAdmin, {only: ['animeAdd', 'charactersAdd', 'peopleAdd', 'studiosAdd', 'staffMembersAdd', 'castingsAdd']});


// These routes need moderator permissions
Router.onBeforeAction(routerBeforeHooks.isModerator, {only: ['revisionsQueue']});


// Removes the search right before the route changes (typically)
Router.onStop(routerOnStopHooks.removeSearch);

// Router.onBeforeAction('dataNotFound');

// Global hooks that every page needs
// Router.onBeforeAction(routerBeforeHooks.loadingIndicator, routerBeforeHooks.isLoggedIn, routerBeforeHooks.scrollUp);

Router.configure({
	fastRender: true,
	layoutTemplate: 'defaultLayout',
	notFoundTemplate: 'fourOhFour',
	loadingTemplate: 'loading',
	yieldTemplates: {
		'adLeaderBoard': {to: 'advertisement'}
	},
	waitOn: function () {
		if (Meteor.user()) {
			var subscriptions = [Meteor.subscribe('userAlerts')];
			if (Meteor.user().isModerator()) {
				subscriptions.push(Meteor.subscribe('moderatorOpenRevisionCount'));
			}
			return subscriptions;
		}
	}
});
