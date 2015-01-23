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

			var profilePost = ProfilePosts.postFields(statusUpdate, user._id, Meteor.userId(), content);



			ProfilePosts.insert(profilePost, function(error, result) {
				if (!error) {
					// Clear the activity create textarea if everything went well
					$('#createProfilePostContent').val('');


					// Add the poster's name in the profile post
					profilePost.posterUsername = Meteor.user().displayName();
					// Send out an alert as long as it wasn't a status update					
					if (statusUpdate === false) {
						Meteor.call('createAlert', 'userProfilePost', profilePost, user._id, function(error, result) {
							// Nothing of interest to put here really.
						});
					}
				}
			});


		}
	}
});