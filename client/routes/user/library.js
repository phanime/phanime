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

		}

		return user;
	}

});