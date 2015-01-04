Meteor.publishComposite("customList", function(_id) {

	return {
		find: function() {
			return CustomLists.find({_id: _id});
		}
	};
});