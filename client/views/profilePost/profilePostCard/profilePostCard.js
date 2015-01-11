Template.profilePostCard.created = function() {

	this.expandCommentsList = new ReactiveVar(false);

};

Template.profilePostCard.events({

	'click .expand-comments-list' : function(event, template) {

		// toggle expandCommentsList
		template.expandCommentsList.set(!template.expandCommentsList.get());

	}

});

Template.profilePostCard.helpers({
	commentsList: function() {
		
		var template = Template.instance();
		var profilePost = template.data;
		var expandCommentsList = template.expandCommentsList.get();
		var comments;

		if (expandCommentsList === true) {
			comments = Comments.find({contentId: profilePost._id, type: 'profilePost'}, {sort: {createdAt: 1}}).fetch();
		} else {
			comments = Comments.find({contentId: profilePost._id, type: 'profilePost'}, {sort: {createdAt: -1}, limit: 3}).fetch();
			comments.reverse();
		}
		
		return comments;

	},
	expandCommentsText: function() {

		var template = Template.instance();
		var profilePost = template.data;
		var expandCommentsList = template.expandCommentsList.get();
		var commentsCount = Comments.find({contentId: profilePost._id, type: 'profilePost'}).count();

		if (commentsCount > 0) {
			if (expandCommentsList === true) {
				return 'Collapse comments';
			// we only want to show view all if there are more than 
			// three comments
			} else if (commentsCount > 3) {
				return 'View all ' + commentsCount + ' comments';
			}
		}

	}
});