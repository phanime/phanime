Template.commentCard.events({
	'click .remove-handle' : function(event, template) {
		var comment = template.data;
		Comments.remove({_id: comment._id});
	}
});