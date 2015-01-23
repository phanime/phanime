Template.reviewAdd.rendered = function() {
	$('.rating').rateit({
		max: 10,
		step: 1
	});
};

Template.reviewAdd.events({

	'click #reviewAddBtn' : function (event, template) {

		var anime = template.data;

		// Setup 
		var reviewContent = $('#reviewContent').val().trim();
		var reviewSummary = $('#reviewSummary').val().trim();

		var storyRating = $('#storyRating').rateit('value');
		var animationRating = $('#animationRating').rateit('value');
		var characterRating = $('#characterRating').rateit('value');
		var soundRating = $('#soundRating').rateit('value');
		var enjoymentRating = $('#soundRating').rateit('value');
		var overallRating = $('#overallRating').rateit('value');

		// Checks done in insert rules in the collection

		var review = {
			animeId: anime._id,
			userId: Meteor.userId(),
			content: reviewContent,
			summary: reviewSummary,
			storyRating: storyRating,
			animationRating: animationRating,
			characterRating: characterRating,
			soundRating: soundRating,
			enjoymentRating: enjoymentRating,
			overallRating: overallRating
		};

		Reviews.insert(review, function(error, result) {
			console.log(error);
			console.log(result);

			if (error) {
				console.log(error);
				Notifications.error('Failed to Publish Review', error.message);
			} else {
				Notifications.success('Successfully Published Review', 'Your review should show up on the anime page in a few moments');

				// This template doesn't necessaryily have access to the modal in every implementation
				// I guess we can do this temporarily.

				$('#reviewAddModal').modal('hide');

			}

		});



		return false;
	}

});