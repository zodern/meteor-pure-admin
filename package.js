Package.describe({
  name: 'zodern:pure-admin',
  version: '0.5.0',
  summary: 'Isolated, customizable admin panel for Meteor',
  git: 'https://github.com/zodern/meteor-pure-admin.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.0.2');
  api.use(['ecmascript', 'dynamic-import']);
  api.use('svelte:compiler@2.15.3_1');

  api.mainModule('./src/main.js', 'client');
  api.mainModule('./src/server.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('pureadmin-tests.js');
});
