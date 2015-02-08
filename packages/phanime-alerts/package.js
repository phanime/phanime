Package.describe({
	name: 'phanime-alerts',
	version: '0.0.1',
});

Package.onUse(function(api) {
	api.addFiles([
		'methods/alert.js'
	], ['server', 'client'])
});