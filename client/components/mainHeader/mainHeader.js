Template.mainHeader.created = function() {
	// Init with 0 and then have it update in rendered
	this.unreadAlertCount = new ReactiveVar(0);
};

Template.mainHeader.events({
	'click #signOut': function(event) {
		// Log the user out on discourse
		Meteor.call('discourseLogout', function(error) {
			console.log(error);
		});

		// Finally log the user out
		Meteor.logout(function(error) {
			if (error) {
				Notifications.error('Logout failed', 'We were unable to log you out, try again?');
			}
		});
	},
	'click .main-header__nav--notification-handler' : function(event) {
		// Once the user clicks the alert toggle, we should mark all the unread alerts as read
		Meteor.call('markAllAlertsRead', Meteor.userId(), function(error, result) {
			if (!error) {
				// All alerts were marked read successfully
			}
		});
	},
	'click #searchGlobal' : function(event) {
		Session.set('isSearchingGlobal', true);
	},

	'click .main-header__nav-toggle-left' : function(event) {
		var el = $('.main-header__nav--left');

		if (el.hasClass('main-header__nav--open')) {
			$('.main-header__nav--left').removeClass('main-header__nav--open');
		} else {
			$('.main-header__nav--left').addClass('main-header__nav--open');
		}
	}
});


Template.mainHeader.helpers({

	// We're setting these in
	alerts: function() {
		var unreadAlertCount = Alerts.find({userId: Meteor.userId(), read: false}).count();
		var alerts = Alerts.find({userId: Meteor.userId()}, {sort: {createdAt: -1}, limit: 10});
		var template = Template.instance();

		template.unreadAlertCount.set(unreadAlertCount);

		return alerts;

	},
	unreadAlertCount: function() {
		var template = Template.instance();
		return template.unreadAlertCount.get();
	},
	alertsClass: function() {

		var unreadAlertCount = Template.instance().unreadAlertCount.get();

		if (unreadAlertCount === 0) {
			return 'fa-bell-o';
		} else {
			return 'fa-bell';
		}

	},

	logoUrl: function() {
		return siteSettings.logoUrl;
	}

});
