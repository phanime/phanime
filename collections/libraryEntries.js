LibraryEntries = new Meteor.Collection("libraryEntries");

LibraryEntries.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the library entry must be created by the user
		return (userId && doc.userId === userId);
	},
	update: function(userId, doc, fields, modifier) {

		// can only change your own library entries
		return doc.userId === userId;

	}


});