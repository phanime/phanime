Package.describe({
	name: 'phanime-homepage-userfeed',
	version: '0.0.1',
	summary: 'Home page userfeed component'
});

Package.onUse(function(api) {

	// Add standard app packages to both server and client
	api.use([
		'standard-app-packages',
		'phanime-lib'
	], ['server', 'client']);


	api.use([
		'reywood:publish-composite',
		'accounts-base',
		'accounts-password'
	], ['server']);


	// Add the view to the client
	api.addFiles([
		'client/views/homePageUserFeed.html',
		'client/views/homePageUserFeed.js'
	], ['client']);

	// Add publication to the server
	api.addFiles([
		'server/publications/homePageUserFeed.js'
	], ['server']);
});