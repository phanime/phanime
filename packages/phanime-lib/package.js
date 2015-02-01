Package.describe({
  name: 'phanime-lib',
  version: '0.0.1',
  summary: 'Client and server helpers',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('phanime-lib.js');
});
