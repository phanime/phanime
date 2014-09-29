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


Template.libraryEntryRowEdit.entryPrivacyClass = function(privacy) {

	if (privacy === true) {
		return "fa-eye-slash";
	} else {
		return "fa-eye";
	}

};

Template.libraryEntryRowEdit.entryRewatchingClass = function(rewatching) {
	if (rewatching === true) {
		return "fa-history";
	} else {
		return "fa-clock-o";
	}
};


Template.libraryEntryRowEdit.entryHighPriorityClass = function(highPriority) {
	if (highPriority === true) {
		return "fa-exclamation-circle";
	} else {
		return "fa-circle-o";
	}
};



Template.libraryEntryRowEdit.privacyToolText = function(privacy) {

	if (privacy === true) {
		return "Private";
	} else {
		return "Public";
	}


};

Template.libraryEntryRowEdit.rewatchingToolText = function(rewatching) {

	if (rewatching === true) {
		return "Rewatching";
	} else {
		return "First time";
	}

};


Template.libraryEntryRowEdit.highPriorityToolText = function(highPriority) {
	if (highPriority === true) {
		return "High Priority";
	} else {
		return "No priority";
	}
};