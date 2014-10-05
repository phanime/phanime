Template.libraryEntryCardAdd.watchStatuses = [
	"Watching",
	"Completed",
	"Plan to watch",
	"On hold",
	"Dropped",
	"Remove"
];


Template.libraryEntryCardAdd.events({

	// Change the status
	'click .status-item' : function(event, template) {

		var status = $(event.target).text();
		

		console.log(status);

		// // Set the current library entry
		// var libraryEntry = template.data;
		// var anime = libraryEntry.anime();
		// if (libraryEntry) {
		// 	// libraryEntry exists for the current user

		// 	// If the user has selected remove as status
		// 	// then we should delete their library entry
		// 	if (status === 'Remove') {
		// 		LibraryEntries.remove({_id: libraryEntry._id});
		// 	}

		// 	// But make sure the status is different
		// 	if (status !== libraryEntry.status) {

		// 		LibraryEntries.update({_id: libraryEntry._id}, {$set: {
		// 			status: status, 
		// 			episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null),
		// 			updatedAt: new Date(),
		// 		}});

		// 		var libraryEntryActivity = Activity.libraryEntryFields('anime', anime._id, 'status', status);

		// 		// Generate an activity for this action
		// 		Meteor.call('createActivity', 'libraryEntry', Meteor.user()._id, libraryEntryActivity, function(error, result) {
		// 			// console.log(error);
		// 			// console.log(result);
		// 		});

		// 		//Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated');

		// 	} else {
		// 		console.log('Statuses same, don\'t update');
		// 	}
		// }
	}
});