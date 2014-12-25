Template.userActivity.created = function() {

	// Initialize reactive variables
	this.loaded = new ReactiveVar(0);
	this.limit = new ReactiveVar(20);
	this.ready = new ReactiveVar(false);
	var self = this;

	this.autorun(function() {
		var limit = self.limit.get();
		// console.log("Asking for " + limit + " activities");

		var subscription = Meteor.subscribe('userWithActivity', self.data.username, limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
			// console.log("Activities are ready");
		} else {
			self.ready.set(false);
			// console.log("Activities aren't ready yet");
		}
	});


	// This will be our activity cursor
	this.activities = function() {
		return Activity.find({userId: self.data._id}, {sort: {createdAt: -1}, limit: self.loaded.get()});
	}

}

Template.userActivity.events({
	'click #activityLoadMore' : function(event, template) {

		var limit = template.limit.get();
		var increment = 20;

		// Let's increment limit by our increment amount, so we can grab the next amount of activities
		template.limit.set(limit + increment);
	}
});


Template.userActivity.helpers({

	activities: function() {
		// Need to attach the respective anime to their entries
		var activities = Template.instance().activities().fetch();

		activities.forEach(function(activity) {
			if (activity.type === 'libraryEntry' && activity.libraryEntry.type === 'anime') {
			
				activity.libraryEntry.anime = Anime.findOne({_id: activity.libraryEntry.contentId});
			
			}

		});

		return activities;
	},
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMoreActivities: function() {
		return Template.instance().activities().count() >= Template.instance().limit.get();
	}

});