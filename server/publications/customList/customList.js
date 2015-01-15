Meteor.publishComposite("customList", function(_id, limit) {
	// We only want to publish normally if either privacy is false, or the current user is the author of the list
	var customList = CustomLists.findOne({_id: _id});
	if (customList.privacy === false || (customList.privacy === true && this.userId === customList.userId)) {
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
			},
			{
				find: function(customList) {
					return Meteor.users.find({_id: customList.userId}, {fields: requireCollectionFields.user.defaultFields});
				}
			},
			{
				find: function(customList) {
					return Comments.find({contentId: customList._id}, {sort: {createdAt: -1}, limit: limit});
				},
				children: [{
					find: function(comment, customList) {
						// Only publish the users that haven't already been published (everone except current user, and author in this case)
						if (comment.userId !== this.userId && comment.userId !== customList.userId) {
							return Meteor.users.find({_id: comment.userId}, {fields: requireCollectionFields.user.defaultFields});
						}
					}
				}]
			}]
		};
	} else {
		return {
			find : function() {
				return CustomLists.find({_id: _id}, {fields: {privacy: 1}});
			}
		}
	}

});
