Activity = new Meteor.Collection('activity');

// Types of activity
	// post
	// libraryEntry
	// 
Activity.libraryEntryFields = function(type, contentId, whatChanged, newValue) {
	// Content ID can either be animeId or mangaId (no manga for now)
	var libraryEntry = {
		type: type,
		contentId: contentId,
		whatChanged: whatChanged,
		newValue: newValue
	};

	return libraryEntry;

};

Activity.postFields = function(posterId, content) {
	var post = {
		posterId: posterId,
		content: content
	};

	return post;
};

// // Interacting with activities 
// Activity.create = function() {
	
// }

