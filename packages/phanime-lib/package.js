Package.describe({
	name: 'phanime-lib',
	version: '0.0.1',
	summary: 'Client and server helpers',
});

Package.onUse(function(api) {
	api.addFiles([
		'parseTextForMentions.js'
	], ['server']);
});
