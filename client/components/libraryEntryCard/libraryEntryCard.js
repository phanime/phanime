Template.libraryEntryCard.rendered = function() {
	$('.entry-rating').rateit({
		max: 10,
		step: 1
	});
};

Template.libraryEntryCard.events({
	'over .entry-rating' : function(event, template, value) {
		var rating = $(event.target).rateit('value');

		$(event.target).attr('title', value);
	}
});



Template.libraryEntryCard.helpers({

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