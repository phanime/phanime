Package.describe({
  name: 'phanime-blazy',
  version: '0.0.1',
  summary: 'A wrapper around bLazy.js for lazy loading images',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles(['blazy.min.js'], 'client');
});
