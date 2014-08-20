UserLibraryController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('userWithLibraryEntries', this.params.username);
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username});
		
		if (this.ready()) {
			user.libraryEntries = LibraryEntries.find({userId: user._id}).fetch();

			user.libraryEntries.forEach(function(libraryEntry) {
				libraryEntry.anime = Anime.findOne({_id: libraryEntry.animeId});
			});

			// // Attach anime to a library entry

			// user.libraryEntries.fetch().forEach(function(libraryEntry) {
			// 	libraryEntry.anime = Anime.findOne({_id: libraryEntry.animeId});
			// });

			console.log(user.libraryEntries);

		}

		return user;
	}

});