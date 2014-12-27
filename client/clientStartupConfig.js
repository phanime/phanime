Meteor.startup(function () {

	// Global Notifications timeout

    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });

});




Accounts.onResetPasswordLink(function(token, done) {

	Router.go('resetPassword', {token: token});


});