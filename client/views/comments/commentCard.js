Template.commentCard.events({
	'click .remove-handle' : function(event, template) {
		var comment = template.data;
		Comments.remove({_id: comment._id});
	},

	'click .toggle-like-comment' : function(event, template) {
		var comment = template.data;
		var likes = comment.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			Comments.update(
				{
					_id: comment._id
				}, 
				{
					$pull: {likes: Meteor.userId()}, 
					$inc: {likeCount: -1}
				},
				function(error) {
					if (error)
						console.log(error);
				}
			);
		} else {
			Comments.update(
				{
					_id: comment._id
				}, 
				{
					$addToSet: {likes: Meteor.userId()}, 
					$inc: {likeCount: 1}
				}, 
				function(error) {
					if (error)
						console.log(error);
				}
			);
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