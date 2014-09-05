Meteor.methods({
	createActivity: function(activity) {

		Activity.insert(activity, function(error, _id) {
			console.log(_id);
			if (error) {
				throw new Meteor.Error(403, error.reason);
			}		
		});

	}
});