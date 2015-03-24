Template.profilePostCard.created = function() {

	this.expandCommentsList = new ReactiveVar(false);

};

Template.profilePostCard.events({

	'click .expand-comments-list' : function(event, template) {

		// toggle expandCommentsList
		template.expandCommentsList.set(!template.expandCommentsList.get());

	},

	'click .toggle-like-post' : function(event, template) {
		var profilePost = template.data.profilePost;
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

	formatContent: function(text) {

		// We first want to escape all the html if there is any
		var text = _.escape(text);
		var returnedHtml = "";
		var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
		var userRegex = /@[a-zA-Z0-9_]+/g;

		// Only one image allowed per post, the rest will be turned into urls
		var imageTrigger = false;
		var ourImage;

		text = text.replace(urlRegex, function(url,b,c) {
			var url2 = (c == 'www.') ?  'http://' +url : url;
			var imageRegex = /^http:\/\/.+\.(gif|png|jpg|jpeg)$/i;
			if (imageRegex.test(url2) && imageTrigger === false) {
				imageTrigger = true;
				ourImage = '<div><a href="' + url2 + '" target="_blank"><img src="' + url2 + '"></a></div>'; 
				return '';
			} else {
				return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
			}
		}); 

		text = text.replace(userRegex, function(match) {
			var userProfileUrl = Router.routes['user'].path({username: match.slice(1, match.length).toLowerCase()});
			return '<a href="' + userProfileUrl + '" class="user-mention">' + match + "</a>";
		});

		if (ourImage) {
			returnedHtml = '<div class="profile-post-card__featured">' + ourImage + "</div>";
		}

		returnedHtml += '<div class="description profile-post-card__text">' + text.trim() + '</div>';

		return returnedHtml;
	},

	likeText: function() {
		var profilePost = Template.instance().data.profilePost;
		var likes = profilePost.likes;

		if (likes && likes.indexOf(Meteor.userId()) > -1) {
			return "Unlike";
		} else {
			return "Like";
		}
	},


	commentsList: function() {
		
		var template = Template.instance();
		var profilePost = template.data.profilePost;
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
		var profilePost = template.data.profilePost;
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