Activity = new Meteor.Collection('activity');

// Types of activity

Activity.libraryEntryFields = function(type, contentId, whatChanged, newValue) {
	// Content ID can either be animeId or mangaId (no manga for now)
	var libraryEntry = {
		type: type, // can either be anime or manga
		contentId: contentId, // will depend on the type
		whatChanged: whatChanged,
		newValue: newValue
	};

	return libraryEntry;

};


Activity.helpers({

	friendlyText: function() {
		var friendlyText = "";
		// if it's a libraryEntry
		var user = Meteor.users.findOne({_id: this.userId});
		if (this.type === 'libraryEntry') {
			switch (this.libraryEntry.whatChanged) {

				case "episodesSeen": 

					friendlyText = user.displayName() + ' watched episode ' + this.libraryEntry.newValue;

					break;
				case "status":

					switch (this.libraryEntry.newValue) {

						case "Watching":
							friendlyText = user.displayName() + " is currently watching";
							break;
						case "Completed":
							friendlyText = user.displayName() + " has completed";
							break;
						case "Plan to watch":
							friendlyText = user.displayName() + " plans to watch";
							break;
						case "On hold":
							friendlyText = user.displayName() + " has put on hold";
							break;
						case "Dropped":
							friendlyText = user.displayName() + " has dropped";
							break;
					} 
					break;

				case "highPriority":

					if (this.libraryEntry.newValue === true) {
						friendlyText = user.displayName() + " has set to high priority";
					} else {
						friendlyText = user.displayName() + " has removed from high priority";
					}

					break;

				case "rewatching":

					if (this.libraryEntry.newValue === true) {
						friendlyText = user.displayName() + " is rewatching";
					} else {
						friendlyText = user.displayName() + " is watching first time";
					}

					break;

			}

		}

		return friendlyText;

	},

	representIcon: function() {

		var icon = 'fa fa-check';

		if (this.type === 'libraryEntry') {
			switch (this.libraryEntry.whatChanged) {
				case "episodesSeen": 

					icon = 'fa fa-plus';

					break;
				case "status":

					switch (this.libraryEntry.newValue) {

						case "Watching":
							icon = 'fa fa-eye';
							break;
						case "Completed":
							icon = 'fa fa-check';
							break;
						case "Plan to watch":
							icon = 'fa fa-lightbulb-o';
							break;
						case "On hold":
							icon = 'fa fa-lock';
							break;
						case "Dropped":
							icon = 'fa fa-times';
							break;
					} 
					break;

				case "highPriority":

					if (this.libraryEntry.newValue === true) {
						icon = 'fa fa-exclamation';
					} else {
						icon = 'fa fa-exclamation';
					}

					break;

				case "rewatching":

					if (this.libraryEntry.newValue === true) {
						icon = 'fa fa-history';
					} else {
						icon = 'fa fa-clock-o';
					}

					break;
			}

		}

		return icon;
	}
});


// ActivityPages = new Meteor.Pagination(Activity, {
// 	router: 'iron-router',
// 	routerTemplate: 'userActivity',
// 	homeRoute: 'userActivity',
// 	perPage: 30,
// 	itemTemplate: 'activityCard',
// 	routerLayout: 'userProfileLayout',
// 	sort: {createdAt: -1},
// 	templateName: 'userActivitySpecific',
// 	/*infiniteItemsLimit: 30,*/

// });