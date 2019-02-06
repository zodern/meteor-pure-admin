# Pure Admin For Meteor
An isolated, customizable admin panel for Meteor

**Version 0.5.0 has been completely rewritten to take advantage of new Meteor features and is not backwards compatible.**

**Requires Meteor 1.8 or newer**

## Isolated
Pure Admin was designed to not interfere with your app:

- Uses Shadow DOM to prevent your app's or Pure Admin's styles from interfering with each other
- Does not use a router or other third party packages on the client.
- UI components are built with Svelte, which turns the components into vinilla js during build time
- Uses dynamic imports to reduce impact on bundle size.

## Customizable

On its own, Pure Admin doesn't do much. It mostly creates the UI and provides some api's for other packages or your app to build on top of. It makes very few assumptions about how your app works. For example, overriding the `PureAdmin.isAdmin` function removes all dependencies on Mongo.

# Use

1. `meteor add zodern:pure-admin`
2. Add packages for Pure Admin to create a custom admin panel
3. Add `PureAdmin.show()` in your client code, for example in a route handler for `/admin`

## Addon packages

Pure Admin on it's own doesn't do much. You can add packages to extend the functionality.

**Available Packages**
- **[mongo](https://atmospherejs.com/zodern/pureadmin-mongo)**: Manage data in your Mongo Database

Ideas for packages
- [x] Manage data in MongoDB
- [ ] Manage and view history of cron jobs
- [ ] Manage users
- [ ] Useful and easily extendable dashboard page

## API

### Server

__PureAdmin.isAdmin__

Must be set before Meteor.startup. Returns true if the user is an admin.

```
PureAdmin.isAdmin = function(userId) {
  return Meteor.users.findOne({_id: userId}).isAdmin || false
}
```

If you do not set this, it defaults to:
- creating a collection called `_PureAdmin-Admins`
- The first userId passed to `PureAdmin.isAdmin` is made an admin
- Add admins by inserting documents in _PureAdmin-admins with the format `{user: "userIdOfAdmin"}`.

### Client

__`PureAdmin.addPage({name: 'pageName', render(utils, props, contentEl) => {}, title(props) => 'title'})`__

Adds a page. When it is shown, `render` is passed:
- `utils` which is an object with:
  - `renderSvelte(svelteComponent)` Renders a svelte component, passing `props` as data, and listening to the `goTo` event
- props
- contentEl - the container element any page content should go into

To override the default blank dashboard, add a page named `Dashboard`.

__`PureAdmin.addMenuItem({ name: 'string', section: 'section', page: 'pageName' })`__
__`PureAdmin.addMenuItem({ name: 'string', section: 'section', page: 'pageName', pageProps: {}, url: 'https://website.com'})`__
__`PureAdmin.addMenuItem({ name: 'string', section: 'section', url: 'https://website.com'})`__

Adds a menu item to the side bar. If `page` is provided, it is shown when selected with `pageProps`. Otherwise, the url in `url` is opened in a new tab.

Pages are grouped by `section`. Pages without a section are shown together at the top of the list.

__`PureAdmin.goTo('pageName');`__

__`PureAdmin.goTo({page: 'pageName', props: {}});`__

Shows the page.

__`PureAdmin.addCss('css string')`__

Due to the use of shadow DOM, css outside of the the admin panel is not inherited by it. CSS added with `addCss` is put inside of a `<styled>` element in the shadow dom. Another option is to use inline styles.

__`PureAdmin.onInit(function () {})`__

These functions are run when the admin panel is opened. They can be used to dynamically import the files that configure Pure Admin.

__`PureAdmin.show()`__

Shows the admin panel

__`PureAdmin.hide()`__

Not implemented.

## TODO

- [ ] Add helpers for rending pages with Blaze, React, or Vue
- [ ] Allow hiding admin panel
- [ ] Add option to store page name and props in url
- [ ] Allow setting page title from page component
- [ ] Allow page to add buttons or search box to page title
- [ ] Add examples for showing admin panel with `FlowRouter` or with a keyboard shortcut
