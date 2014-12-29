Template.libraryEntryCardAdd.events({

	// Change the status
	'click .status-item' : function(event, template) {

		var anime = template.data;

		var status = $(event.target).text();


		// Check if it exists
		var libraryEntry = LibraryEntries.findOne({userId: Meteor.userId(), animeId: anime._id});


		// Ensure the library entry doesn't already exist
		if (!libraryEntry) {

			var currentEntry = {
				canonicalTitle: anime.canonicalTitle,
				userId: Meteor.userId(),
				type: 'anime',
				animeId: anime._id,
				status: status,
			};

			if (anime.totalEpisodes && anime.totalEpisodes > 1 && status === 'Completed')
				currentEntry.episodesSeen = anime.totalEpisodes;


			LibraryEntries.insert(currentEntry, function(error, result) {
				if (error) 
					Notifications.error('Library Entry creation failed', error.reason);
			});
			
		}
	}
});

Template.libraryEntryCardAdd.helpers({
	watchStatuses: [
		"Watching",
		"Completed",
		"Plan to watch",
		"On hold",
		"Dropped"
	]
});

