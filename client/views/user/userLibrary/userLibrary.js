Template.userLibrary.helpers({
	recentlyAdded: function(template) {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id}, {sort: {createdAt: -1}, limit: 6})
			};
		}
	}
});