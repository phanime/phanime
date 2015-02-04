Package.describe({
  name: 'phanime-homepage-schedule',
  version: '0.0.1',
  summary: 'Home page schedule component'
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
    'client/views/homePageSchedule.html',
    'client/views/homePageSchedule.js'
  ], ['client']);

  // Add publication to the server
  api.addFiles([
    'server/publications/homePageSchedule.js'
  ], ['server']);
});