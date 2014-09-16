Template.header.events({
	'click #signOut': function(event) {
		Meteor.logout();
		return false;
	}
});

Template.header.created = function() {

	// Init with 0 and then have it update in rendered
	this.unreadAlertCount = new ReactiveVar(0);

};



// We're setting these in 
Template.header.alerts = function() {
	var alerts = Alerts.find({userId: Meteor.userId(), read: false});
	var template = Template.instance();

	
	template.unreadAlertCount.set(alerts.count());

	return alerts;

};

Template.header.unreadAlertCount = function() {
	var template = Template.instance();
	return template.unreadAlertCount.get();
};

Template.header.alertsClass = function() {

	var unreadAlertCount = Template.instance().unreadAlertCount.get();

	if (unreadAlertCount === 0) {
		return 'fa-bell-o';
	} else {
		return 'fa-bell';
	}

};

