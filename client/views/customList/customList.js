Template.customList.created = function() {
	var customList = Template.currentData();
	var self = this;

	// These reactiveVars needed for infinite scrolling
	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(20);
	self.ready = new ReactiveVar(false);


	self.autorun(function() {
		var limit = self.limit.get();

		var subscription = Meteor.subscribe("customList", customList._id, limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
		} else {
			self.ready.set(false);
		}
	});

};

Template.customList.events({
	'click #loadMore' : function(event, template) {
		// Two rows of the cover view
		var increment = 20;
		template.limit.set(template.limit.get() + increment);

	}
});

Template.customList.helpers({
	// Exposing reactive variables to the template
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMoreComments: function() {
		var customList = Template.currentData();
		return Comments.find({contentId: customList._id, type: "customList"}).count() >= Template.instance().limit.get();
	}
})