import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({

	checkEntryExists: function() {

		// Clear whatever we currently have and recalculate
		this.set('currentEntry', null);
		this.set('currentWatchStatus', 'Add to Library');

		var anime = this.get('model');	
		var self = this;
		console.log(anime);

		// Only when the model isn't null
		if (anime) {
			this.get('session.currentUser').then(function(user) {
				user.get('library_entries').then(function(entries) {

					var entry = entries.find(function(item) {
						console.log(item);
						console.log(anime);

						item.get('anime_id').then(function(entryAnime) {

							self.set('entryCondition', entryAnime.get('id') === anime.get('id'));

							if(entryAnime.get('id') === anime.get('id')) {
								console.log(item);
								self.set('currentEntry', item);
								self.set('currentWatchStatus', item.get('status'));
							}

						});

						return self.get('entryCondition');
					});

					self.set('currentEntry', entry);

				});	
			});
		}


				
	}.observes('model', 'session.currentUser.libraryEntries').on('init'),

	currentEntry: null,
	currentAnime: null,
	entryCondition: false,


	currentWatchStatus: 'Add to Library',

	watchStatuses: [
		"Watching",
		"Completed",
		"Plan to watch",
		"On hold",
		"Dropped",
	],


	actions: {
		changeWatchStatus: function(status) {
			var currentEntry = this.get('currentEntry');
			var libraryEntry;

			this.set('currentWatchStatus', status);
			var anime = this.get('model');

			// We create or update the entry
			// depending on if the entry already exists
			// or not
			var store = this.store;
			var self = this;
 			
 			if (currentEntry) {

 				// Check if status actually changed
 				if(currentEntry.get('status') === status) {
 					return; 
 				}

 				// If control reaches here, the statuses are different

				libraryEntry = currentEntry;

				// Update the status
				libraryEntry.set('status', status);

				var onSuccess = function() {
					var msg = "Status Updated";
					console.log(msg);
					Notify.success(msg);
				};

				var onFailure = function() {
					var msg = "Something went wrong, status was not updated";
					console.log(msg);
					Notify.success(msg);
				};

				libraryEntry.save().then(onSuccess, onFailure);

			} else {

				this.get('session.currentUser').then(function(user) {
					var episodes_seen;

					if (status === 'Completed') {
						episodes_seen = anime.get('total_episodes');
					} else {
						episodes_seen = null;
					}

					libraryEntry = store.createRecord('libraryEntry', {
						status: self.get('currentWatchStatus'),
						anime_id: anime,
						user_id: user,
						episodes_seen: episodes_seen,
					});


					var onSuccess = function(entry) {
						var msg = "Saved to your library";
						console.log(msg);
						Notify.success(msg);

						self.get('session.currentUser').then(function(user) {
							user.get('library_entries').then(function(entries) {
								entries.pushObject(libraryEntry);
							});
						});

						// Now we need to set current entry here
						self.set('currentEntry', entry);
						self.set('currentWatchStatus', entry.get('status'));
					};

					var onFailure = function() {
						var msg = "Something went wrong, entry was not saved";
						console.log(msg);
						Notify.success(msg);
					};


					libraryEntry.save().then(onSuccess, onFailure);
				});

			}
		}
	}
});
