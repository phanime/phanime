Template.homePageUserFeed.created = function() {

	var self = this;
	// This currentUser contains all the fields that we need (followers/following)
	var currentUser = Meteor.users.findOne({_id: Meteor.userId()});

	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(20);
	self.ready = new ReactiveVar(false);
	self.profilePosts = new ReactiveVar();


	this.autorun(function() {
		var limit = self.limit.get();
		var ready = self.ready.get();


		var subscription = Meteor.subscribe("homePageUserFeed", limit);

		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
			var cursor = ProfilePosts.find({$or: [{userId: currentUser._id}, {statusUpdate: true, userId: {$in: currentUser.following}}]}, {limit: limit, sort: {createdAt: -1}});
			self.profilePosts.set(cursor);
		} else {
			self.ready.set(false);
		}
	});
};

Template.homePageUserFeed.events({

	'click .loadMore' : function(event, template) {
		// Two rows of the cover view
		var increment = 20;
		template.limit.set(template.limit.get() + increment);
	}

});


Template.homePageUserFeed.helpers({
	profilePosts: function() {
		return Template.instance().profilePosts.get();
	},
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMoreProfilePosts: function() {
		return Template.instance().profilePosts.get().count() >= Template.instance().limit.get();
	}
});