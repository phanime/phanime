Template.commentCard.events({
	'click .remove-handle' : function(event, template) {
		var comment = template.data;
		Comments.remove({_id: comment._id});
	},

	'click .toggle-like-comment' : function(event, template) {
		var comment = template.data;
		var likes = comment.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			Meteor.call("unlikeComment", comment, function(error) {
				if (error) {
					console.log(error);
				}
			});
		} else {
			Meteor.call("likeComment", comment, function(error) {
				if (error) {
					console.log(error);
				}
			});
		}
	}
});

Template.commentCard.helpers({
	likeText: function() {
		var comment = Template.instance().data;
		var likes = comment.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			return "Unlike";
		} else {
			return "Like";
		}
	}
});