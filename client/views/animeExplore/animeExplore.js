Template.animeExplore.created = function() {

	// Initialize reactive variables
	this.loaded = new ReactiveVar(0);
	this.limit = new ReactiveVar(24);
	this.ready = new ReactiveVar(false);
	this.filterObject = new ReactiveVar({});
	this.sortObject = new ReactiveVar({canonicalTitle: 1});

	// Display purposes
	this.dateCurrentlyActive = new ReactiveVar("None");

	var self = this;

	this.autorun(function() {
		var limit = self.limit.get();
		var filterObject = self.filterObject.get();
		var sortObject = self.sortObject.get();

		console.log("Asking for " + limit + " activities");

		var subscription = Meteor.subscribe('animeExplore', limit, filterObject, sortObject);

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
		return Anime.find(self.filterObject.get(), {sort: self.sortObject.get(), limit: self.loaded.get()});
	}

}

Template.animeExplore.rendered = function() {
	// Initialize the selectize plugin
	var self = this;

	Meteor.call('getGenres', function(error, result) {
		if (!error) {
			$("#selectGenre").selectize({
				valueField: "name",
				labelField: "name",
				searchField: "name",
				options: result,
				create: false,
				onChange: function(value) {
					var filterObject = self.filterObject.get();

					if (!value) {
						if (filterObject.genres) {
							delete filterObject.genres;
						}
					} else {
						filterObject.genres = {
							$all: value
						};
					}

					self.filterObject.set(filterObject);
				}
			});
		}
	});

}

Template.animeExplore.events({
	'click #loadMore' : function(event, template) {

		var limit = template.limit.get();
		var increment = 18;

		console.log('Clicked');
		// Let's increment limit by our increment amount, so we can grab the next amount of activities
		template.limit.set(limit + increment);
	},
	'click #upcomingAnime' : function(event, template) {
		// Upcoming anime should have their start date be greater than today's date
		var filterObject = template.filterObject.get();

		// We'll remove the $or because it's for currently airing 
		if (filterObject.$and)
			delete filterObject.$and;

		filterObject.startDate = {
			$gte: new Date()
		};

		template.dateCurrentlyActive.set("Upcoming");

		template.filterObject.set(filterObject);
	},
	'click #currentlyAiring' : function(event, template) {
		// Currently airing anime would either not have endDate field or it's value will be greater than 
		// today's date and will have their start date before today's value
		var filterObject = template.filterObject.get();
		// We'll have to remove any other date conditions on here first 
		if (filterObject.startDate)
			delete filterObject.startDate;

		filterObject.$and = [{
			$or: [{
				endDate: {$gte: new Date()}
			},
			{
				endDate: {$exists: false}
			}]
		},
		{
			startDate: {
				$lt: new Date()
			}
		}];


		template.dateCurrentlyActive.set("Currently Airing");
		template.filterObject.set(filterObject);
	},
	'click #noneDate' : function(event, template) {
		// This method essentially resets and date restrictions we had 
		// like upcoming or currentlyAiring
		var filterObject = template.filterObject.get();

		if (filterObject.startDate)
			delete filterObject.startDate;

		if (filterObject.$and) 
			delete filterObject.$and;

		template.dateCurrentlyActive.set("None");
		template.filterObject.set(filterObject);
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
	},
	dateCurrentlyActive: function(type) {
		if (type === Template.instance().dateCurrentlyActive.get()) {
			return 'active';
		} else {
			return '';
		}
	}
});