Alerts = new Meteor.Collection('alerts');

Alerts.allow({
	insert: function(userId, doc) {
		// We want the notifications to be send only through
		// a meteor method
		return false;
	}
});


Alerts.helpers({


	userFriendlyText: function() {
		
		var userFriendlyText;

		switch (this.event) {

			case "userFollow": 

				var followerProfileUrl = Router.routes['user'].path({username: this.properties.followerUsername});	
				userFriendlyText = "<span><a href='" + followerProfileUrl + "'>" + this.properties.followerUsername + "</a></span> started following you.";

				break;
			case "userProfilePost":

				var posterProfileUrl = Router.routes['user'].path({username: this.properties.posterUsername});
				var userProfileUrl = Router.routes['user'].path({username: Meteor.user().username});
				userFriendlyText = "<span><a href='" + posterProfileUrl + "'>" + this.properties.posterUsername + "</a></span> posted on <span><a href='" + userProfileUrl + "'>your profile</a></span>.";

				break;
		}


		return userFriendlyText;

	}


});