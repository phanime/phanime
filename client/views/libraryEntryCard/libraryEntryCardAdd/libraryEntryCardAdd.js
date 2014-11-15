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
				userId: Meteor.userId(),
				type: 'anime',
				animeId: anime._id,
				status: status,
				episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null),
				createdAt: new Date(),
			};

			LibraryEntries.insert(currentEntry, function(error, result) {
				console.log(error);
				console.log(result);
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
		"Dropped",
		"Remove"
	]
});

