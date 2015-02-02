Template.homePageActiveEntries.created = function() {

	var self = this;
	self.ready = new ReactiveVar(false);
	self.activeEntries = new ReactiveVar();
	var subscription = Meteor.subscribe("homePageActiveEntries");

	this.autorun(function() {
		if (subscription.ready()) {
			self.ready.set(true);
			var cursor = LibraryEntries.find({userId: Meteor.userId(), $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {sort: {updatedAt: -1}, limit: 6});
			self.activeEntries.set(cursor);
		} else {
			self.ready.set(false);
		}
	});

};