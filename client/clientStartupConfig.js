Meteor.startup(function () {

	// Global Notifications timeout

    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });

});