Meteor.methods({
	phanimeLib__parseTextForMentions: function(text) {
		var userRegex = /@[a-zA-Z0-9_]+/g;
		var usernames = [];
		var maxMentions = 5;
		text.replace(userRegex, function(match, text, urlId) {
			var username = match.slice(1, match.length).toLowerCase(); // Removes the @
			if (usernames.indexOf(match) === -1 && match.trim().length > 1) {
				usernames.push(username);
			}
		});

		if (usernames.length > maxMentions) {
			throw new Meteor.Error(403, "There is a maximum limit of " + maxMentions + " mentions per message.");
		}

		return usernames;
	}
});