Template.commentCard.events({
	'click .remove-handle' : function(event, template) {
		var comment = template.data;
		Comments.remove({_id: comment._id});
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