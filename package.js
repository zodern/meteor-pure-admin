Package.describe({
  name: 'zodern:pure-admin',
  version: '0.8.3',
  summary: 'Isolated, customizable admin panel for Meteor',
  git: 'https://github.com/zodern/meteor-pure-admin.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.2');
  api.use(['typescript', 'ecmascript', 'dynamic-import']);
  api.use('zodern:melte@1.4.0');
  api.use('zodern:types');

  api.mainModule('./src/main.ts', 'client');
  api.mainModule('./src/server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('pureadmin-tests.js');
});
