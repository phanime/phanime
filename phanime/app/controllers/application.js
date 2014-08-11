import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	// Request invite email
	email: null,
	username: null,
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
			"http://static.tumblr.com/qmeablg/6JAlyn4op/tumblr_layytg8cqf1qc2jhfo1_500.gif",
			"http://media-cache-ec0.pinimg.com/originals/68/0b/69/680b69563aceba3df48b4483d007bce3.jpg",
			"http://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif",
			"http://media.giphy.com/media/OaHp43V1N4OvC/giphy.gif",
			"http://data.whicdn.com/images/19521764/tumblr_luch96ogPv1qemssho1_500_large.gif",
			"http://24.media.tumblr.com/f66cf98b45010359bea6ed008ffcd614/tumblr_n5eyqwMG1q1sf5vppo1_500.gif",
			"http://i.imgur.com/6mOAx9v.gif",
		];

		var randGif = gifs[Math.floor(Math.random() * gifs.length)];

		return randGif;

	}.property(),

	// REAL APPLICATION STUFFS

	isAddingGlobal: false,


	// Version Number of phanime
	phanime_version_number: "v0.2.0 alpha",



	search_query: null,
	actions: {
		trigger_search: function() {
			this.transitionTo('search', this.get('search_query'));
		},
		requestInvite: function() {
			var email = this.get('email');
			var username = this.get('username');

			if (email !== '' && email !== null && username !== '' && username !== null) {
				$.post('/api/v1/requestInvite', {email: email, username: username}, function(data) {
					
					if (data.username) {
						console.log(data.username[0]);
						Notify.warning(data.username[0]);
					}

					if (data.email) {
						Notify.warning(data.email[0]);
					}
					
					if ( data === undefined || data === '' ) {
						Notify.success('Invite request received.');
					}


				}).fail(function() {
					Notify.warning('Something went wrong, invite request was not received.');
				});


			}
		},
		triggerAddingGlobal: function() {
			this.toggleProperty('isAddingGlobal');

			// console.log('stuff');
			// if (this.get('isAddingGlobal') === true) {

			// 	if (this.get('isAnime') === true) {



			// 		var anime = this.get('currentAnime');	
			// 		var self = this;

			// 		this.get('session.currentUser').then(function(user) {
			// 			user.get('library_entries').then(function(entries) {

			// 				console.log(entries);
			// 				console.log(entries.findBy('user_id', '1'));

			// 				var entry = entries.find(function(item) {
			// 					console.log(item);
			// 					console.log(anime);

			// 					item.get('anime_id').then(function(entryAnime) {

			// 						self.set('entryCondition', entryAnime.get('id') === anime.get('id'));

			// 						if(entryAnime.get('id') === anime.get('id')) {
			// 							self.set('currentEntry', item);
			// 							self.set('currentWatchStatus', item.get('status'));
			// 						}

			// 					});

			// 					return self.get('entryCondition');
			// 				});

			// 				self.set('currentEntry', entry);

			// 			});	
			// 		});



			// 	}				
			// }
		},
		// changeWatchStatus: function(status) {
		// 	var currentEntry = this.get('currentEntry');
		// 	var libraryEntry;

		// 	this.set('currentWatchStatus', status);
		// 	var anime = this.get('currentAnime');

		// 	// We should create or update the entry
		// 	// depending on if the entry already exists
		// 	// or not
		// 	var store = this.store;
		// 	var self = this;
 			
 	// 		if (currentEntry) {

		// 		libraryEntry = currentEntry;

		// 		// Update the status
		// 		libraryEntry.set('status', status);

		// 		var onSuccess = function() {
		// 			var msg = "Updated status";
		// 			console.log(msg);
		// 			Notify.success(msg);
		// 		};

		// 		var onFailure = function() {
		// 			var msg = "Something went wrong, entry was not updated";
		// 			console.log(msg);
		// 			Notify.success(msg);
		// 		};

		// 		libraryEntry.save().then(onSuccess, onFailure);

		// 	} else {

		// 		this.get('session.currentUser').then(function(user) {
					
		// 			libraryEntry = store.createRecord('libraryEntry', {
		// 				status: self.get('currentWatchStatus'),
		// 				anime_id: anime,
		// 				user_id: user
		// 			});


		// 			var onSuccess = function() {
		// 				var msg = "Saved to your library";
		// 				console.log(msg);
		// 				Notify.success(msg);
		// 			};

		// 			var onFailure = function() {
		// 				var msg = "Something went wrong, entry was not saved";
		// 				console.log(msg);
		// 				Notify.success(msg);
		// 			};


		// 			libraryEntry.save().then(onSuccess, onFailure);
		// 		});

		// 	}
		// }
	},

	// isEntryAddedCompute: function() {
	// 	if (this.get('isAnime')) {
	// 		var anime = this.get('currentAnime');	
	// 		var self = this;

	// 		this.get('session.currentUser').then(function(user) {
	// 			user.get('library_entries').then(function(entries) {
	// 				for(var i = 0; i < entries.length; i++) {
	// 					if(anime.get('id') === entries[i].get('id')) {
	// 						console.log('Exists');
	// 						self.set('isEntryAdded', true);
	// 						self.set('currentEntry', entries[i]);
	// 					}
	// 				}
	// 			});	
	// 		});
	// 	}	

	// }.observes('session.currentUser').on('init'),

	// currentEntry: null,
	// entryCondition: false,

	// // GLOBAL ADD anime library entry (for now)
	// isAnime: function() {
	// 	return this.get('currentRouteName') === 'anime.index';
	// }.property('currentRouteName'),

	
	// currentAnime: null,
	// currentWatchStatus: 'Add to Library',

	// watchStatuses: [
	// 	"Watching",
	// 	"Completed",
	// 	"Plan to watch",
	// 	"On hold",
	// 	"Dropped",
	// ],
});
