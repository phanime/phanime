Package.describe({
  name: 'phanime-masonry',
  version: '0.0.1',
  summary: 'Masonry wrapped for meteor'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.addFiles('lib/masonry.pkgd.js', 'client');
});
