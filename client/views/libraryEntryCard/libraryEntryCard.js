Template.libraryEntryCard.watchStatuses = [
	"Watching",
	"Completed",
	"Plan to watch",
	"On hold",
	"Dropped",
	"Remove"
];


Template.libraryEntryCard.rendered = function() {
	$('.entry-rating').rateit({
		max: 10,
		step: 1
	});
}

Template.libraryEntryCard.events({

	// Change the status
	'click .status-item' : function(event, template) {

		var status = $(event.target).text();
		

		// Set the current library entry
		var libraryEntry = template.data;
		var anime = libraryEntry.anime;

		if (libraryEntry) {
			// libraryEntry exists for the current user

			// If the user has selected remove as status
			// then we should delete their library entry
			if (status === 'Remove') {
				LibraryEntries.remove({_id: libraryEntry._id});
			}

			// But make sure the status is different
			if (status !== libraryEntry.status) {

				LibraryEntries.update({_id: libraryEntry._id}, {$set: {
					status: status, 
					episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null),
					updatedAt: new Date(),
				}});

				//Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated');

			} else {
				console.log('Statuses same, don\'t update');
			}
		}
	},

	// Change the rating

	'click .entry-rating' : function(event, template) {
		//console.log($(event.target));

		var libraryEntry = template.data;
		var rating = $('#rating_' + libraryEntry._id).rateit('value');
		
		// Update library entry
		
		// Lets make sure the rating is different
		if (rating !== libraryEntry.rating) {

			// This means we should remove the rating (you can't give an anime a rating of 0)
			if (rating === 0) {
				LibraryEntries.update({_id: libraryEntry._id}, {$unset: {rating: ""}});
			} else {
				LibraryEntries.update({_id: libraryEntry._id}, {$set: {rating: rating, updatedAt: new Date()}});
			}
		} else {
			console.log('Ratings are the same, didn\'t update');
		}
	},

	// Change the episodes seen

	'change .entry-episodesSeen' : function(event, template) {
		var episodesSeen = $(event.target).val();
		var libraryEntry = template.data;

		// Let's make it an int (if things went wrong)
		episodesSeen = parseInt(episodesSeen);

		// Ensure episodesSeen was actually changed
		if (episodesSeen !== libraryEntry.episodesSeen) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {episodesSeen: episodesSeen, updatedAt: new Date()}});
		} else {
			console.log('Episodes seen was not changed');
		}

	},

	// Update privacy, rewatching, and priority

	'click .fa' : function(event, template) {

		var icon = $(event.target);
		var libraryEntry = template.data;
		var privacy;
		var rewatching;
		var highPriority;

		// The privacy icon was clicked
		if (icon.hasClass('entry-privacy')) {
			
			if (libraryEntry.privacy === true) {
				privacy = false;
			} else {
				privacy = true;
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {privacy: privacy}});


		} else if (icon.hasClass('entry-rewatching')) {

			if (libraryEntry.rewatching === true) {
				rewatching = false;
			} else {
				rewatching = true;
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {rewatching: rewatching}});


		} else if (icon.hasClass('entry-highPriority')) {

			if (libraryEntry.highPriority === true) {
				highPriority = false;
			} else {
				highPriority = true;
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {highPriority: highPriority}});
		}

	},

	// Change the comments

	'blur .entry-comments' : function(event, template) {
		var comments = $(event.target).val();
		var libraryEntry = template.data;

		// Some simple cleaning 
		comments = comments.trim();

		// Ensure comments are different from before
		if (comments !== libraryEntry.comments) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {comments: comments, updatedAt: new Date()}});
		} else {
			console.log('Comments were not changed');
		}

	}


});

Template.libraryEntryCard.entryPrivacyClass = function(privacy) {

	if (privacy === true) {
		return "fa-lock";
	} else {
		return "fa-unlock";
	}

};