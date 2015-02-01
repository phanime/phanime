Package.describe({
  summary: "spoiler-alert.js wrapper for Meteor",
  version: "1.0.0"
});

Package.onUse(function(api) {

  api.use('jquery');

  // JS
  api.addFiles('spoiler.js', 'client');
});