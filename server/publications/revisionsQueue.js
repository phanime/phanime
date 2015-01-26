Meteor.publishComposite("revisionsQueue", function(status, limit) {

	return {
		find: function() {
			return Revisions.find({status: status}, {limit: limit, sort: {createdAt: -1}});
		},
		children: [{
			find: function(revision) {
				switch (revision.contentType) {
					case "Anime": 
						if (revision.type === "Revision") {
							return Anime.find({_id: revision.content._id});
						}
				}
			}
		}]
	};
});