Meteor.publishComposite("revisionsQueue", function(limit) {

	return {
		find: function() {
			return Revisions.find({}, {limit: limit});
		},
		children: [{
			find: function(revision) {
				switch (revision.contentType) {
					case "Anime":
						return Anime.find({_id: revision.content._id});
				}
			}
		}]
	};
});