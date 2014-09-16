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

				var routerPath = Router.routes['user'].path({username: 'Maaz'});	
				userFriendlyText = "Someone followed you, visit their <a href='" + routerPath + "'>profile</a>";

				break;
			case "userProfilePost":

				userFriendlyText = 'Someone posted on your profile';

				break;
		}


		return userFriendlyText;

	}


});