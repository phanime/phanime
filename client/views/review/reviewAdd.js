Template.reviewAdd.rendered = function() {
	$('.rating').rateit({
		max: 10,
		step: 1
	});
}

Template.reviewAdd.events({

	'click #reviewAddBtn' : function (event, template) {

		var reviewContent = $('#reviewContent').val().trim();
		var reviewSummary = $('#reviewSummary').val().trim();

		var storyRating = $('#storyRating').rateit('value');
		var animationRating = $('#animationRating').rateit('value');
		var characterRating = $('#characterRating').rateit('value');
		var soundRating = $('#soundRating').rateit('value');
		var enjoymentRating = $('#soundRating').rateit('value');
		var overallRating = $('#overallRating').rateit('value');



		console.log(reviewContent);
		console.log(reviewSummary);
		console.log(storyRating);




		return false;
	}

});