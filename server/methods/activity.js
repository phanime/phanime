Meteor.methods({
	createActivity: function(type, userId, extra) {

		var activity = {
			type: type,
			userId: userId,
			createdAt: new Date()
		};

		if (extra)
			activity[type] = extra;


		Activity.insert(activity, function(error, _id) {
			console.log(_id);
			if (error) {
				throw new Meteor.Error(403, error.reason);
			}		
		});

	}
});