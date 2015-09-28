if (typeof PureAdmin === 'undefined') {
  PureAdmin = {};
}

PureAdmin._pages = [];

/**
 * Adds a page. Includes adding a link to the menu, routing, and what templates to show.
 * @param route {String} - route for page. User {adminRoute} to add route prefix
 * @param menuGroup {String} - group to add page to on the menu
 * @param linkName {String} - name for link
 */
var addPage = function (route, menuGroup, linkName) {
  if(route.indexOf('{adminRoute}') > -1) {
    route = route.replace('{adminRoute}', PureAdmin.routePrefix);
  }
  PureAdmin._pages.push({
    route: route,
    menuGroup: menuGroup,
    linkName: linkName
  });
};

PureAdmin.addPage = addPage;
