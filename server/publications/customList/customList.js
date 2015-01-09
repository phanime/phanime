Meteor.publishComposite("customList", function(_id) {

	return {
		find: function() {
			return CustomLists.find({_id: _id});
		},
		children: [{
			find: function(customList) {
				var ids = _.pluck(customList.entries, 'contentId');

				switch (customList.type) {
					case "anime":
						return Anime.find({_id: {$in: ids}});
					case "characters":
						return Characters.find({_id: {$in: ids}});
					case "people":
						return People.find({_id: {$in: ids}});
				}

			}
		}]
	};
});
