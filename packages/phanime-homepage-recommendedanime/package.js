Package.describe({
	name: 'phanime-homepage-recommendedanime',
	version: '0.0.1',
	summary: 'Recommended Anime module for the homepage',
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
		'client/views/homePageRecommendedAnime.html',
		'client/views/homePageRecommendedAnime.js'
	], ['client']);

	// Add publication to the server
	api.addFiles([
		'server/publications/homePageRecommendedAnime.js'
	], ['server']);
});