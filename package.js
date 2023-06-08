Package.describe({
  name: 'zodern:pure-admin',
  version: '0.9.1',
  summary: 'Isolated, customizable admin panel for Meteor',
  git: 'https://github.com/zodern/meteor-pure-admin.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.2');
  api.use(['typescript@3.7.0||4.0.0', 'ecmascript', 'dynamic-import']);
  api.use('zodern:melte@1.6.1');
  api.use('zodern:types@1.0.7');

  api.mainModule('./src/main.ts', 'client');
  api.mainModule('./src/server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('pureadmin-tests.js');
});
