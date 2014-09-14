Meteor.methods({
	discourseSSO: function(payload, sig) {
		var sso = new discourse_sso('6hkLiMrwyC7sB4JPm1Vu');
		var nonce;
		// validate sig with payload
		if (sso.validat(payload, sig)) {
			var nonce = sso.getNonce(payload);
			console.log(nonce);
		}
	};
});