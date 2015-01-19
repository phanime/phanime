Meteor.publishComposite("animeExplore", function(limit, filterObject, sortObject) {

	return {
		find: function() {
			return Anime.find(filterObject, {sort: sortObject, limit: limit});
		},
		children: [{
			// This is a pretty bad way of grabbing all the libraryentries that are affiliated with the 
			// anime that we are loading. We should really be doing a pluck of all the animeIds and then doing a 
			// in to get all the libraryEntries. This will do for now :)
			find: function(anime) {
				if (this.userId) {
					return LibraryEntries.find({userId: this.userId, animeId: anime._id});
				}
			}
		}]
	};
});