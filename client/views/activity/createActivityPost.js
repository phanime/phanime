Template.createActivityPost.events({
	
	'keyup textarea' : function(e) {
		while($(e.target).outerHeight() < this.scrollHeight + parseFloat($(e.target).css("borderTopWidth")) + parseFloat($(e.target).css("borderBottomWidth"))) {
			$(e.target).height($(e.target).height()+1);
			console.log($(e.target).height());
		};
	},

	'click #createActivityPostBtn' : function(event, template) {
		var content = $('#createActivityPostContent').val().trim();
		var user = template.data;
		var type;
		if (content.length >= 1) {

			// Figure out if it's a status update or a profilePost
			if (user._id === Meteor.userId()) {
				type = 'statusUpdate';
			} else {
				type = 'profilePost';
			}

			var post = Activity.postFields(type, Meteor.userId(), content);

			Meteor.call('createActivity', 'post', user._id, post, function(error, result) {
				console.log(error);
				console.log(result);
				if (!error) {
					// Clear the activity create textarea if everything went well
					$('#createActivityPostContent').val('');
				}
			});


		}
	}

});