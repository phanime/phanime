globalHotKeys = new Hotkeys();

// This will open search pop up
globalHotKeys.add({
	combo: "`",
	callback: function() {
		Session.set('isSearchingGlobal', true);
	}
});

// This will close search pop up
globalHotKeys.add({
	combo: "esc",
	callback: function() {
		Session.set('isSearchingGlobal', false);
	}
});
