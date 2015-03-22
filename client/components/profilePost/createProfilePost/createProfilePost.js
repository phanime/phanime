Template.createProfilePost.events({
	
	'keyup textarea' : function(e) {
		while($(e.target).outerHeight() < this.scrollHeight + parseFloat($(e.target).css("borderTopWidth")) + parseFloat($(e.target).css("borderBottomWidth"))) {
			$(e.target).height($(e.target).height()+1);
			console.log($(e.target).height());
		};
	},

	'click #createProfilePostBtn' : function(event, template) {
		var content = $('#createProfilePostContent').val().trim();
		var user = template.data;
		var statusUpdate;

		if (content.length >= 1) {

			// Figure out if it's a status update or a profilePost
			if (user._id === Meteor.userId()) {
				statusUpdate = true;
			} else {
				statusUpdate = false;
			}

			var profilePost = {
				statusUpdate: statusUpdate,
				userId: user._id,
				posterId: Meteor.userId(),
				content: content
			};

			ProfilePosts.insert(profilePost, function(error, _id) {
				if (!error) {
					// Clear the activity create textarea if everything went well
					$('#createProfilePostContent').val('');

					console.log(_id);
					// Add the poster's name in the profile post
					profilePost.posterUsername = Meteor.user().displayName();
					profilePost.profilePostId = _id;
					// Send out an alert as long as the poster isn't the one thats getting alerted					
					if (statusUpdate === false) {
						Meteor.call('createAlert', 'userProfilePost', profilePost, user._id, function(error, result) {
							// Nothing of interest to put here really.
						});
					}


					Meteor.call('phanimeLib__parseTextForMentions', content, function(error, result) {
						if (error) {
							Notifications.error('Failed to create a profile post', error.reason);
						} else {
							Meteor.call('phanimeAlerts__alertUsernames', 'mentionProfilePost', profilePost, result, function(error, result) {
								console.log(error);
								console.log(result);
							});
						}
					});
				} else {
					Notifications.error('Profile post creation failed', error.reason);
				}
			});


		}
	}
});