Template.customListEdit.created = function() {
	var self = this;
	self.query = new ReactiveVar('');
	self.ready = new ReactiveVar(true);
	self.searchResults = new ReactiveVar();

	// Searching autorun function
	self.autorun(function() {
		var query = self.query.get();
		console.log("It ran again");
		console.log(self.data);
		if (query !== '') {
			var subscription = Meteor.subscribe('customListContentSearch', query, self.data.type);
			// Work around, we want to remove all of the libraryEntries 

			if (subscription.ready()) {
				console.log("Subscription ready");
				switch(self.data.type) {
					case "anime":
						self.searchResults.set(Anime.find({canonicalTitle: new RegExp(query)}));
						break;
					case "characters":
						self.searchResults.set(Characters.find({firstName: new RegExp(query)}));
						break;
					case "people":
						self.searchResults.set(People.find({firstName: new RegExp(query)}));
						break;					
				}
				self.ready.set(true);
			} else {
				self.ready.set(false);
			}
		}
	});
}

Template.customListEdit.rendered = function() {
	var entries = document.getElementById('entries');
	var sortable = Sortable.create(entries, {
		animation: 150,
	});
}


Template.customListEdit.events({

	'keydown #search' : function(event, template) {
		
		// If the enter key is pressed, then do a search
		if (event.which === 13) {
			var query = $('#search').val();
			
			if (query) {
				console.log(query);
				template.query.set('');
				template.query.set(query);
			}
		}
	},

	'click .anime-card' : function(event, template) {

		var anime = this;
		var customList = template.data;

		// We need to make sure our current customList does not have this already
		if (_.pluck(customList.entries, 'contentId').indexOf(anime._id) === -1) {
			// We want to add this specific anime to the customList
			var entry = {
				contentId: anime._id,
				sortOrder: 100
			};
			CustomLists.update({_id: customList._id}, {$push: {entries: entry}});
		}

	}

});

Template.customListEdit.helpers({
	ready: function() {
		return Template.instance().ready.get();
	},
	searchResults: function() {
		return Template.instance().searchResults.get();
	}
});