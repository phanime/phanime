Package.describe({
	name: 'phanime-mal-import',
	summary: 'Imports MAL user anime lists into phanime',
	version: '1.0.0',
	git: ''
});

Npm.depends({
	'xml2js': '0.4.4',
	'moment': '2.9.0'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.use([
		'iron:router',
		'reactive-var',
		'spacebars',
		'templating',
		'ui',
		'underscore',
		'http'
	], ['client', 'server']);

	// Additions to the server
	api.addFiles([
		'server/methods/getUserList.js'
	], ['server']);


});
