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

		console.log(content);

		if (content.length >= 1) {

			// Figure out if it's a status update or a profilePost
			if (user._id === Meteor.userId()) {
				statusUpdate = true;
			} else {
				statusUpdate = false;
			}

			var profilePost = ProfilePosts.postFields(statusUpdate, user._id, Meteor.userId(), content);



			ProfilePosts.insert(profilePost, function(error, result) {
				console.log(error);
				console.log(result);
				if (!error) {
					// Clear the activity create textarea if everything went well
					$('#createProfilePostContent').val('');
				}
			});


		}
	}

});