import Ember from 'ember';
import OAuthCustomAuthenticator from 'phanime/authenticators/oauth-custom';
import Session from 'simple-auth/session';


export default {
	name: 'oauth-custom',
	before: 'simple-auth',

	initialize: function(container) {
		Session.reopen({
			currentUser: function() {
				var user_id = this.get('user_id');
				if (!Ember.isEmpty(user_id)) {
					return container.lookup('store:main').find('user', user_id);
				}
			}.property('user_id')
		});
		container.register(
			'oauth-custom:oauth2-password-grant',
			OAuthCustomAuthenticator
		);
	}
};