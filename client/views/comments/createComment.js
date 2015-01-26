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

						var userIdToAlert;

						if (commentType === "customList") {
							userIdToAlert = parent.userId;
						} else {
							userIdToAlert = parent.posterId;
						}

						// We don't send an alert if the parent post was also posted by that user

						if (userIdToAlert !== comment.userId) {

							var properties = {
								posterId: comment.userId,
								commentType: comment.type,
								posterUsername: Meteor.user().displayName()
							};

							if (commentType === "customList") {
								properties.customListId = parent._id;
								properties.customListTitle = parent.title;
							} else if (commentType === "profilePost") {
								properties.profilePostId = parent._id;
								properties.userProfileId = parent.userId;
							}



							Meteor.call('createAlert', 'comment', properties, userIdToAlert, function(error, result) {
								if (error) {
									console.log(error.reason);
									throw new Meteor.Error(400, error.reason);
								}
							});

						}
					}
				});


			}
		}

	}

});
