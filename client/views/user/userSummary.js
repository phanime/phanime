Template.userSummary.created = function() {
	this.isEditing = new ReactiveVar(false);
}

Template.userSummary.events({
	'click #editProfile' : function(event, template) {
		template.isEditing.set(!template.isEditing.get());
		console.log('test');
	},
	'click #saveProfile' : function(event, template) {
		// Let's save things 

	}
});


Template.userSummary.helpers({
	isEditing: function() {
		return Template.instance().isEditing.get();
	}
})