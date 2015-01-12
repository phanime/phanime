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
	var customList = Template.currentData();
	var sortable = Sortable.create(entries, {
		animation: 150,
		handle: ".sort-handle"
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
				sortOrder: customList.entries.length > 0 ? customList.entries.length : 0
			};
			CustomLists.update({_id: customList._id}, {$push: {entries: entry}});
		}

	},
	'click #saveBtn' : function(event, template) {
		// We need to iterate over the list and update our entries
		var customList = template.data;
		var entries = customList.entries;
		$('#entries > li').each(function(index) {
			// console.log(index + " " + $(this).attr('data-contentId'));
			var curContentId = $(this).attr('data-contentId');
			var curComment = $(this).find('.entry-comment').val().trim();
			for (var i = 0; i < entries.length; i++) {
				if (curContentId === entries[i].contentId) {
					// We need to update it's sortOrder property
					entries[i].sortOrder = index;

					// We'll also add the comment, if it exists
					if (curComment.length > 0) {
						entries[i].comment = curComment;
					}
					// We also don't want to loop through the whole array if we've found our item
					break;
				}
			}
		});


		console.log(entries);
		var sortedEntries = _.sortBy(entries, function(entry) { return entry.sortOrder; });
		CustomLists.update({_id: customList._id}, {$set: {entries: sortedEntries}}, function(error, num) {
			if (!error) {
				Router.go('customList', CustomLists.findOne({_id: customList._id}));
			} else {
				Notifications.error("Custom list failed to update", error.message);
			}
		});


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
