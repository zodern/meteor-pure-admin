Package.describe({
  name: 'zodern:pureadmin',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Isolated, customizable admin panel for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/zodern/meteor-pure-admin',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('meteorhacks:picker', 'server');
  api.use('meteorhacks:ssr', 'server');
  api.addFiles('pureadmin.js', 'server');
  api.addAssets(['output/pure-admin.css', 'output/pure-admin.js'],'client');
  api.addAssets(['index.html'], 'server');
  api.addFiles(['src/packages/lib/lib.js','src/server/admin.js','src/server/pure_admin_api_methods.js'], 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('pureadmin');
  api.addFiles('pureadmin-tests.js');
});
