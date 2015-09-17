if (typeof PureAdmin === 'undefined') {
  PureAdmin = {};
}

PureAdmin._pages = [];

/**
 * Adds a page. Includes adding a link to the menu, routing, and what templates to show.
 * @param route {String} - route for page
 * @param menuGroup {String} - group to add page to on the menu
 * @param item {String} -
 * @constructor
 */
var addPage = function (route, menuGroup, linkName) {
  PureAdmin._pages.push({
    route: route,
    menuGroup: menuGroup,
    linkName: linkName
  });
};

PureAdmin.addPage = addPage;