// Publish library entries for user

Meteor.publish('userLibrary', function(userId) {
	return LibraryEntries.find({userId: userId});
});

Meteor.publishComposite('libraryEntriesLatest', function() {
	return {
		find: function() {
			return LibraryEntries.find({userId: this.userId}, {limit: 6});
		},
		children: [
			{
				find: function(libraryEntry) {
					return Anime.find({_id: libraryEntry.animeId});
				}
			}
		]
	}; 
});

Meteor.publishComposite('libraryEntriesIndexLatest', function() {
	return {
		find: function() {
			return LibraryEntries.find({userId: this.userId, $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6});
		},
		children: [
			{
				find: function(libraryEntry) {
					return Anime.find({_id: libraryEntry.animeId});
				}
			}
		]
	}; 
});