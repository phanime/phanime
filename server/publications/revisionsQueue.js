Meteor.publishComposite("revisionsQueue", function() {

	return {
		find: function() {
			return Revisions.find();
		}
	};
});