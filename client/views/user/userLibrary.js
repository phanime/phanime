Template.userLibrary.rendered = function() {
	$('.libraryEntryCard').popover({
		html: true,
		placement: 'auto right',
		content: function() {
			return $(this).find('.libraryEntryForm').html();
		},
		trigger: 'click'
	});
};

Template.userLibrary.watchStatuses = [
	"Watching",
	"Completed",
	"Plan to watch",
	"On hold",
	"Dropped",
	"Remove"
];


Template.userLibrary.events({

	'click .status-item' : function(event, template) {

		var status = $(event.target).text();
		
		console.log(Meteor.userId());

		// Set the current library entry
		var anime = template.data;
		var libraryEntry = $(event.target).parents('.libraryEntryId');
		console.log(libraryEntry);


		// if (currentEntry) {
		// 	// libraryEntry exists for the current user

		// 	// If the user has selected remove as status
		// 	// then we should delete their library entry
		// 	if (status === 'Remove') {
		// 		LibraryEntries.remove({_id: currentEntry._id});
		// 	}

		// 	// But make sure the status is different
		// 	if (status !== currentEntry.status) {

		// 		LibraryEntries.update({_id: currentEntry._id}, {$set: {
		// 			status: status, 
		// 			episodesSeen: (anime.totalEpisodes && status === 'Completed' ? currentEntry.anime.totalEpisodes : null)
		// 		}});
		// 		Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated');
		// 	} else {
		// 		console.log('Statuses same, don\'t update');
		// 	}
		// }
	}

});