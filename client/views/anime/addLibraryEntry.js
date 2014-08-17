Template.addLibraryEntry.watchStatuses = [
		"Watching",
		"Completed",
		"Plan to watch",
		"On hold",
		"Dropped",
];


Template.addLibraryEntry.events({

	'click .status-item' : function(event, template) {
		// For some awkward reason, unable to use 
		// $(this).html() or $(this).text() .. will
		// need to examine this further, for now
		// we'll do with the .join
		var status = $(this).toArray().join('');
		

		// Set the current library entry (could be undefined)
		var currentEntry = template.data.libraryEntry;
		var anime = template.data;

		if (currentEntry) {
			// libraryEntry exists for the current user

			// But make sure the status is different
			if (status !== currentEntry.status) {
				LibraryEntries.update({_id: currentEntry._id}, {$set: {status: status}});
			} else {
				console.log('Statuses same');
			}

		} else {
			var currentEntry = {
				userId: Meteor.userId(),
				animeId: anime._id,
				status: status
			};

			LibraryEntries.insert(currentEntry, function(error, result) {
				console.log(error);
				console.log(result);
			});

			// create a new entry with the specified status
		}
	}

});