SignInController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Sign In | phanime",
			og: {
				'title' : "Sign In | phanime" ,
			}
		});
	}

});