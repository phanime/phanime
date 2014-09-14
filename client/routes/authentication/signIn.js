SignInController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Sign In"),
			og: {
				'title' : siteSettings.getFullTitle("Sign In"),
			}
		});
	},
	data: function() {
		return {
			sso: this.params.sso,
			sig: this.params.sig
		};
	}

});