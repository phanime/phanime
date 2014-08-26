// Template.userLibrary.rendered = function() {
// 	$('.libraryEntryCard').popover({
// 		html: true,
// 		placement: 'auto right',
// 		content: function() {
// 			return $(this).find('.libraryEntryForm').html();
// 		},
// 		trigger: 'click'
// 	});
// };

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
					episodesSeen: (anime.totalEpisodes && status === 'Completed' ? anime.totalEpisodes : null)
				}});

				//Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated');

			} else {
				console.log('Statuses same, don\'t update');
			}
		}
	},
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
				LibraryEntries.update({_id: libraryEntry._id}, {$set: {rating: rating}});
			}
		} else {
			console.log('Ratings are the same, didn\'t update');
		}
	},

	'blur .entry-episodesSeen' : function(event, template) {
		var episodesSeen = $(event.target).val();
		var libraryEntry = template.data;

		// Let's make it an int (if things went wrong)
		episodesSeen = parseInt(episodesSeen);

		// Ensure episodesSeen was actually changed
		if (episodesSeen !== libraryEntry.episodesSeen) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {episodesSeen: episodesSeen}});
		} else {
			console.log('Episodes seen was not changed');
		}

	},

	'blur .entry-comments' : function(event, template) {
		var comments = $(event.target).val();
		var libraryEntry = template.data;

		// Some simple cleaning 
		comments = comments.trim();

		// Ensure comments are different from before
		if (comments !== libraryEntry.comments) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {comments: comments}});
		} else {
			console.log('Comments were not changed');
		}

	}


});