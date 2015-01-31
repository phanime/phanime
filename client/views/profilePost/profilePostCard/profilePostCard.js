Template.profilePostCard.created = function() {

	this.expandCommentsList = new ReactiveVar(false);

};

Template.profilePostCard.events({

	'click .expand-comments-list' : function(event, template) {

		// toggle expandCommentsList
		template.expandCommentsList.set(!template.expandCommentsList.get());

	},

	'click .toggle-like-post' : function(event, template) {
		var profilePost = template.data;
		var likes = profilePost.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			Meteor.call("unlikeProfilePost", profilePost, function(error) {
				if (error) {
					console.log(error);
				}
			});
		} else {
			Meteor.call("likeProfilePost", profilePost, function(error) {
				if (error) {
					console.log(error);
				}
			});			
		}
	}

});

Template.profilePostCard.helpers({

	likeText: function() {
		var profilePost = Template.instance().data;
		var likes = profilePost.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			return "Unlike";
		} else {
			return "Like";
		}
	},


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