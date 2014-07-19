import Authenticator from 'simple-auth-oauth2/authenticators/oauth2';

export default Authenticator.extend({
	makeRequest: function(url, data) {
		console.log(data);
		data.client_id = "izjb0t4jEQ4HvZ2oaaze";
		data.client_secret = "GQ4TiUfISAMPnlObzV22";
		data.scope = "guest";
		console.log(data);
		console.log(data.client_id);
		return this._super(url, data);
	}
});