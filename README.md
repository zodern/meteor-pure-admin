# Pure Admin For Meteor
An isolated, customizable admin panel for Meteor

## Isolated
When you go to myapp.com/admin Pure Admin uses a server route to load it's client. This way Pure Admin's files for the client will not interfere with your app. Also, Pure Admin's client is not included in your app's bundle so users will not have to wait for the admin to load along with the rest of the app.

## Customizable

Pure Admin doesn't do any admin things on it's own. Instead it makes it possible to create an isolated admin panel. Everything is added by packages or using the API. If you don't use MongoDB, for example, you can add a package to view data in the database you are using and override PureAdmin.isAdmin function.

# Use

1. `meteor add zodern:pure-admin`
2. Add packages for Pure Admin to create a custom admin panel.
3. Go to localhost:3000/admin

## Addon packages
There currently are no packages that extend Pure Admin. If you have made one, please create a pull request to add it here or create an issue.

Needed Add on packages
- [ ] Manage data in MongoDB
- [ ] Manage data in SQL databases
- [ ] Manage and view history of cron jobs
- [ ] Manage users

## API

### Server

__PureAdmin.isAdmin__

Must be set before Meteor.startup. Returns true if the user is an admin.

```
PureAdmin.isAdmin = function(userId) {
  return Meteor.users.findOne({_id: userId}).isAdmin || false
}
```
If you do not set this, we will set it to the default. In the default, a collection is created called `_PureAdmin-Admins`. The first user to visit myapp.com/admin is made an admin. You can add admins by adding documents to _PureAdmin-admins. The document format is `{user: userIdOfAdmin}`.

__PureAdmin.addFiles__

```
PureAdmin.addFiles('myFileInPublicFolder.js');
PureAdmin.addFiles(['file1.js', 'file2.js', 'folder/file.js']);
```

Adds files to load in Pure Admin's client. The path is relative to your public folder. Since it is a prebuilt client, this is how your app or packages can extend Pure Admin. Currently, only js files can be added this way. We will add support for css files soon. The load order of files is not guaranteed. JS will be loaded in parallel, but will be executed after templates are loaded.

__PureAdmin.addTemplate__

```
PureAdmin.addTemplate('templateName', 'pathToTemplateInPublicFolder.html');
PureAdmin.addTemplate('analytics.Dashboard', 'admin_templates/analytics/dashbaord.html');
```
In admin_templates/analytics/dashboard.html:
```
{{! Exclude the <template> tags}}
<h1>Analytics</h1>
```
Adds templates to be loaded. Only one template can be in each html file. Do not have the `<template>` tag in the html file. Templates are loaded in parrallel with js files, but js files are evaluated after the templates are loaded.

### Client

#### Routing
We use Flow Router and Blaze Layout. You need to define your own routes.

```
PureAdmin.routePrefix
```
Currently returns '/admin'. Will be configurable in the future.

```
// route path is appended to myapp.com/admin
PureAdmin.adminRoutes.route('/adminRoute', {
  action: function () {
    BlazeLayout.render('main', {header: 'myHeaderTemplate', body: 'myBodyTemplate'});
  }
  });
```

#### Menu
You can use the menu api to add groups or links to the menu.

```
PureAdmin.addPage('route', 'menuGroup', 'displayName');
PureAdmin.addPage('{adminRoute}/analytics', 'Analytics', 'Overview');
PureAdmin.addPage('analytics.google.com', 'Analytics', 'Google Analytics');
```

The route can be to a page in the admin panel, an external page, or a page in your app. If it is a page in the admin panel, prefix it with `{adminRoute}`. It will be replaced with the route prefix for the admin routes.


## How it works

The client is part of a meteor app in /src. It is generated using `gulp biuld-client`. The generated files are added as a client asset. The server route sends an html file which loads the generated js and css.

## TODO

- [ ] Add items to dashboard
- [ ] Do not automatically make first visitor an admin
- [ ] API to load css
- [ ] Allow using a template in menu
- [ ] Shortcuts to open menu or go to dashboard
- [ ] Make it easier to click the menu or close button
- [ ] Make info button more useful
