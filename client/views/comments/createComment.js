Template.createComment.events({
	
	'keypress .create-comment textarea' : function (event, template) {

		// Only execute the below code if the enter key was pressed
		if (enterkey was pressed only) {
			var commentContent = $(event.target).val();
			var profilePost = template.data;

			// Quick check that it's not empty 
			if (commentContent.length >= 1) {

				var comment = {
					type: 'profilePost',
					contentId: profilePost._id,
					content: commentContent,
					userId: Meteor.userId(),
					createdAt: new Date(),
				}

				Comments.insert(comment, function(error, result) {
					if (!error) {
						// Clear comment area
						$(event.target).val('');
					}
				});


			}
		}

	}
	
});	