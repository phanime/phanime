Template.reviewAdd.rendered = function() {
	$('.rating').rateit({
		max: 10,
		step: 1
	});
}

Template.reviewAdd.events({

	'click #reviewAddBtn' : function (event, template) {
		console.log('clicked');
		return false;
	}

});