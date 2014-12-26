Template.animeExplore.created = function() {

	// Initialize reactive variables
	this.loaded = new ReactiveVar(0);
	this.limit = new ReactiveVar(24);
	this.ready = new ReactiveVar(false);
	var self = this;

	this.autorun(function() {
		var limit = self.limit.get();
		console.log("Asking for " + limit + " activities");

		var subscription = Meteor.subscribe('animeExplore', limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
		} else {
			self.ready.set(false);
		}
	});


	// This will be our activity cursor
	this.anime = function() {
		return Anime.find({}, {sort: {canonicalTitle: 1}, limit: self.loaded.get()});
	}

}

Template.animeExplore.events({
	'click #loadMore' : function(event, template) {

		var limit = template.limit.get();
		var increment = 18;

		console.log('Clicked');
		// Let's increment limit by our increment amount, so we can grab the next amount of activities
		template.limit.set(limit + increment);
	}
});


Template.animeExplore.helpers({

	anime: function() {
		return Template.instance().anime();
	},
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMoreAnime: function() {
		return Template.instance().anime().count() >= Template.instance().limit.get();
	}

});