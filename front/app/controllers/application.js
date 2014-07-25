import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	// Hide the nav bar / footer and other things if user is on the index page and isn't logged in
	isLandingPage: function() {
		if ( !this.get('session.isAuthenticated') && this.get('currentRouteName') === 'index') {
			return true;
		} else {
			return false;
		}
	}.property('session.isAuthenticated', 'currentRouteName'),

	landingImage: function() {

		var gifs = [
			"http://25.media.tumblr.com/6f70d7604b667b5b03700457ebe57df3/tumblr_mhi5buozb81qf8isso1_500.gif",
			"http://24.media.tumblr.com/d3aa208c3d135fc4cbdc1d4b469a4c8f/tumblr_mwadwrdFWB1qztgoio1_500.gif",
			"http://media2.giphy.com/media/fm6xxZHgHLwxa/giphy.gif",
			"http://media0.giphy.com/media/ZOGCyj0NW28gg/giphy.gif",
			"http://media.giphy.com/media/zHGXhFJCVCbD2/giphy.gif",
			"http://31.media.tumblr.com/tumblr_m3q9vmuqGg1rozgayo1_500.gif",
			"http://media-cache-ec0.pinimg.com/originals/13/9f/f5/139ff545b37593fcff57c0c9f676de17.jpg",
			"http://media.giphy.com/media/13LQZoCE0Nysr6/giphy.gif",
		];

		var randGif = gifs[Math.floor(Math.random() * gifs.length)];

		return randGif;

	}.property(),


	search_query: null,
	actions: {
		trigger_search: function() {
			this.transitionTo('search', this.get('search_query'));
		}
	}
});
