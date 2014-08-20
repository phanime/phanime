Template.addLibraryEntry.watchStatuses = function() {
	var watchStatuses = [
		"Watching",
		"Completed",
		"Plan to watch",
		"On hold",
		"Dropped",
	];

	var currentEntry = this.libraryEntry;

	if (currentEntry) {
		// if entry exists, then add remove option
		watchStatuses.push("Remove");
	}

	return watchStatuses;

};


Template.addLibraryEntry.events({

	'click .status-item' : function(event, template) {
		// For some awkward reason, unable to use 
		// $(this).html() or $(this).text() .. will
		// need to examine this further, for now
		// we'll do with the .join
		var status = $(this).toArray().join('');
		
		console.log(Meteor.userId());

		// Set the current library entry (could be undefined)
		var currentEntry = template.data.libraryEntry;
		var anime = template.data;

		if (currentEntry) {
			// libraryEntry exists for the current user

			// If the user has selected remove as status
			// then we should delete their library entry
			if (status === 'Remove') {
				LibraryEntries.remove({_id: currentEntry._id});
			}

			// But make sure the status is different
			if (status !== currentEntry.status) {

				LibraryEntries.update({_id: currentEntry._id}, {$set: {
					status: status, 
					episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null)
				}});
				//Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated to ' + status);
			} else {
				console.log('Statuses same, don\'t update');
			}

		} else {

			// If the status is complete then we can add 
			// episodes seen and set it to total episodes 
			// of the anime, if available

			var currentEntry = {
				userId: Meteor.userId(),
				animeId: anime._id,
				status: status,
				episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null)
			};

			LibraryEntries.insert(currentEntry, function(error, result) {
				console.log(error);
				console.log(result);
			});

			// create a new entry with the specified status
		}
	}

});