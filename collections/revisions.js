Revisions = new Meteor.Collection('revisions');


Revisions.createRevisionObject = function(contentType, type, userId, username, content) {

	return {
		contentType: contentType, // The content that's being revised (anime, character, people, etc)
		type: type, // Whether it's a Revision or an Addition
		userId: userId, // The user's id that's submitting the revision
		username: username, // The user's name that's submitting the revision
		status: "Open", // The status of the revision, whether it's Open, Approved, Rejected
		content: content // The actual object that's being sent in, this could be Anime fields, Character Fields, and so on.
	};



};