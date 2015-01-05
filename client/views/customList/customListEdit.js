Template.customListEdit.created = function() {
	var self = this;
	self.query = new ReactiveVar('');
	self.ready = new ReactiveVar(true);
	self.entries = new ReactiveVar();

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
						self.entries.set(Anime.find({canonicalTitle: new RegExp(query)}));
						break;
					case "characters":
						self.entries.set(Characters.find({firstName: new RegExp(query)}));
						break;
					case "people":
						self.entries.set(People.find({firstName: new RegExp(query)}));
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
	}

});

Template.customListEdit.helpers({
	ready: function() {
		return Template.instance().ready.get();
	},
	entries: function() {

		return Template.instance().entries.get();
		// return [
		// 	{
		// 		contentId: "123123",
		// 		sortOrder: 3,
		// 		comment: "Sasdfup"
		// 	},
		// 	{
		// 		contentId: "12312323",
		// 		sortOrder: 2,
		// 		comment: "Suasdfp"
		// 	},
		// 	{
		// 		contentId: "12312123",
		// 		sortOrder: 1,
		// 		comment: "Supasdf"
		// 	},
		// 	{
		// 		contentId: "12314223",
		// 		sortOrder: 4,
		// 		comment: "Supfw324213"
		// 	}
		// ]
	}
});