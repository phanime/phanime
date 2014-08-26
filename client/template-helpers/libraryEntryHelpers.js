UI.registerHelper("entryPrivacyClass", function(private) {
	if (private === true) {
		return "fa-lock";
	} else {
		return "fa-unlock";
	}
});
