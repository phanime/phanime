Template.createComment.events({

	'keypress .create-comment textarea' : function (event, template) {
		// Only execute the below code if the enter key was pressed
		if (event.keyCode == 13 && !event.shiftKey) {
			var commentContent = $(event.target).val().trim();
			var parent = template.data.parent;
			var commentType = template.data.commentType;

			// Quick check that it's not empty
			if (commentContent.length >= 1) {

				var comment = {
					type: commentType,
					contentId: parent._id,
					content: commentContent,
					userId: Meteor.userId(),
				};

				// We clear the comment;
				$(event.target).val('');

				Comments.insert(comment, function(error, _id) {
					if (error) {
						Notifications.error('Comment creation failed!', error.reason);
					} else {
						$(event.target).val('');
					}
				});


			}
		}

	}

});
