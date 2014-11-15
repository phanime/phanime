Template.libraryEntryRowEdit.rendered = function() {
	$('.entry-rating').rateit({
		max: 10,
		step: 1
	});

	$('.fa.entry').tooltip();	
};


Template.libraryEntryRowEdit.watchStatuses = [
	"Watching",
	"Completed",
	"Plan to watch",
	"On hold",
	"Dropped",
	"Remove"
];


Template.libraryEntryRowEdit.events({

	// Change the status
	'click .status-item' : function(event, template) {

		var status = $(event.target).text();
		

		// Set the current library entry
		var libraryEntry = template.data;
		var anime = libraryEntry.anime();
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

				var libraryEntryActivity = Activity.libraryEntryFields('anime', anime._id, 'status', status);

				// Generate an activity for this action
				Meteor.call('createActivity', 'libraryEntry', Meteor.user()._id, libraryEntryActivity, function(error, result) {
					// console.log(error);
					// console.log(result);
				});

				//Notifications.success('Library Entry Updated', 'Your library entry status was successfully updated');

			} else {
				console.log('Statuses same, don\'t update');
			}
		}
	},

	// Change the rating

	'rated .entry-rating' : function(event, template) {

		var libraryEntry = template.data;
		var rating = $(event.target).rateit('value');
		
		// Update library entry
		// console.log(rating);
		// console.log(libraryEntry.rating);
		// Lets make sure the rating is different
		if (rating !== libraryEntry.rating) {

			// This means we should remove the rating (you can't give an anime a rating of 0)
			if (rating === 0) {
				LibraryEntries.update({_id: libraryEntry._id}, {$unset: {rating: ""}, $set: {updatedAt: new Date()}});
			} else {
				LibraryEntries.update({_id: libraryEntry._id}, {$set: {rating: rating, updatedAt: new Date()}});
			}
		} else {
			console.log('Ratings are the same, didn\'t update');
		}
	},

	'reset .entry-rating' : function(event, template) {

		var libraryEntry = template.data;
		var rating = $(event.target).rateit('value');
		
		// Update library entry
		// console.log(rating);
		// console.log(libraryEntry.rating);
		// Lets make sure the rating is different
		if (rating !== libraryEntry.rating) {

			// This means we should remove the rating (you can't give an anime a rating of 0)
			if (rating === 0) {
				LibraryEntries.update({_id: libraryEntry._id}, {$unset: {rating: ''}, $set: {updatedAt: new Date()}});
			}
		} else {
			console.log('Ratings are the same, didn\'t update');
		}

	},
	'over .entry-rating' : function(event, template, value) {
		var rating = $(event.target).rateit('value');

		$(event.target).attr('title', value);
	},
	// Change the episodes seen

	'change .entry-episodesSeen' : function(event, template) {
		var episodesSeen = $(event.target).val();
		var libraryEntry = template.data;
		var anime = libraryEntry.anime();

		// Let's make it an int (if things went wrong)
		episodesSeen = parseInt(episodesSeen);

		// Ensure episodesSeen was actually changed
		if (episodesSeen !== libraryEntry.episodesSeen) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {episodesSeen: episodesSeen, updatedAt: new Date()}});


			var libraryEntryActivity = Activity.libraryEntryFields('anime', anime._id, 'episodesSeen', episodesSeen);

			// Generate an activity for this action
			Meteor.call('createActivity', 'libraryEntry', Meteor.user()._id, libraryEntryActivity, function(error, result) {
				// console.log(error);
				// console.log(result);
			});


		} else {
			console.log('Episodes seen was not changed');
		}

	},

	// Update privacy, rewatching, and priority

	'click .libraryEntryIcons' : function(event, template) {

		var icon = $(event.target);
		var libraryEntry = template.data;
		var anime = libraryEntry.anime();
		var privacy;
		var rewatching;
		var highPriority;
		var toolTitle;

		// The privacy icon was clicked
		if (icon.hasClass('entry-privacy')) {
			
			if (libraryEntry.privacy === true) {
				privacy = false;
				toolTitle = "Public";
			} else {
				privacy = true;
				toolTitle = "Private";
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {privacy: privacy, updatedAt: new Date()}});

			// Fix the tooltip text update it to the newest 
			$('.libraryEntryIcons.entry-privacy').attr('title', toolTitle).tooltip('fixTitle');


		} else if (icon.hasClass('entry-rewatching')) {

			if (libraryEntry.rewatching === true) {
				rewatching = false;
				toolTitle = "First time";
			} else {
				rewatching = true;
				toolTitle = "Rewatching";
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {rewatching: rewatching, updatedAt: new Date()}});

			// Fix the tooltip text update it to the newest 
			$('.libraryEntryIcons.entry-rewatching').attr('title', toolTitle).tooltip('fixTitle');

			var libraryEntryActivity = Activity.libraryEntryFields('anime', anime._id, 'rewatching', rewatching);

			// Generate an activity for this action
			Meteor.call('createActivity', 'libraryEntry', Meteor.user()._id, libraryEntryActivity, function(error, result) {
				// console.log(error);
				// console.log(result);
			});


		} else if (icon.hasClass('entry-highPriority')) {

			if (libraryEntry.highPriority === true) {
				highPriority = false;
				toolTitle = "No Priority";
			} else {
				highPriority = true;
				toolTitle = "High Priority";
			}

			LibraryEntries.update({_id: libraryEntry._id}, {$set: {highPriority: highPriority, updatedAt: new Date()}});

			// Fix the tooltip text update it to the newest 
			$('.libraryEntryIcons.entry-highPriority').attr('title', toolTitle).tooltip('fixTitle');

			var libraryEntryActivity = Activity.libraryEntryFields('anime', anime._id, 'highPriority', highPriority);

			// Generate an activity for this action
			Meteor.call('createActivity', 'libraryEntry', Meteor.user()._id, libraryEntryActivity, function(error, result) {
				// console.log(error);
				// console.log(result);
			});



		}

	},

	// Change the comments

	'blur .entry-comments' : function(event, template) {
		var comments = $(event.target).val().trim();
		var libraryEntry = template.data;

		// Some simple cleaning 
		comments = comments.trim();

		if (comments === '') {
			LibraryEntries.update({_id: libraryEntry._id}, {$unset: {comments: ''}, $set: {updatedAt: new Date()}});
		}

		// Ensure comments are different from before
		if (comments !== libraryEntry.comments) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {comments: comments, updatedAt: new Date()}});
		} else {
			console.log('Comments were not changed');
		}

	}
});



Template.libraryEntryRowEdit.helpers({
	watchStatuses: [
		"Watching",
		"Completed",
		"Plan to watch",
		"On hold",
		"Dropped",
		"Remove"
	],
	entryPrivacyClass: function(privacy) {

		if (privacy === true) {
			return "fa-eye-slash";
		} else {
			return "fa-eye";
		}

	},

	entryRewatchingClass: function(rewatching) {
		if (rewatching === true) {
			return "fa-history";
		} else {
			return "fa-clock-o";
		}
	},


	entryHighPriorityClass: function(highPriority) {
		if (highPriority === true) {
			return "fa-exclamation-circle";
		} else {
			return "fa-circle-o";
		}
	},



	privacyToolText: function(privacy) {

		if (privacy === true) {
			return "Private";
		} else {
			return "Public";
		}


	},

	rewatchingToolText: function(rewatching) {

		if (rewatching === true) {
			return "Rewatching";
		} else {
			return "First time";
		}

	},


	highPriorityToolText: function(highPriority) {
		if (highPriority === true) {
			return "High Priority";
		} else {
			return "No priority";
		}
	}
});