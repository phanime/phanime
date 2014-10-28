Package.describe({
  summary: "spoiler-alert.js wrapper for Meteor",
  version: "1.0.0",
  git: ""
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use('jquery');

  // JS
  api.addFiles('spoiler.js', 'client');
});