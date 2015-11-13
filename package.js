Package.describe({
  name: 'zodern:pure-admin',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: 'Isolated, customizable admin panel for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/zodern/meteor-pure-admin.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('meteorhacks:picker@1.0.3', 'server');
  api.addFiles('pureadmin.js', 'server');
  var clientAssets = ['output/pure-admin.css', 'output/pure-admin.js'];
  var serverAssets = ['index.html'];
  if(api.addAssets) {
    api.addAssets(clientAssets, 'client');
    api.addAssets(serverAssets, 'server');
  } else {
    api.addFiles(clientAssets, 'client', {isAsset: true});
    api.addFiles(serverAssets, 'server', {isAsset: true});
  }
  api.addFiles(['src/packages/lib/lib.js','src/server/admin.js','src/server/pure_admin_api_methods.js'], 'server');
  api.addFiles(['src/server/pure_admin_api.js'], 'server');
  api.export('PureAdmin');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('pureadmin-tests.js');
});
