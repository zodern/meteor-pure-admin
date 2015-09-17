var menu = {};
if (typeof PureAdmin === 'undefined') {
  PureAdmin = {};
}
PureAdmin.menu = menu;
menu.groups = [];

menu._addgroup = function (name) {
  if (typeof PureAdmin._findgroup(name) !== 'undefined') {
    return;
  }
  PureAdmin._groups.push({
    _id: new Mongo.ObjectID()._str,
    name: name,
    items: []
  });
};

PureAdmin._findGroupById = function (id) {
  return _.find(PureAdmin._groups, function (item) {
    return item._id === id;
  });
};

PureAdmin._findgroup = function (name) {
  return _.find(PureAdmin._groups, function (item) {
    return item.name === name;

  });
};

PureAdmin._findItemById = function(groupData, itemId) {
  return _.find(groupData.items, function (item) {
    return item._id === itemId;
  });
};

/**
 * Adds items to the menu in Pure Admin. Is synced
 * @param groupName {String} name of menu group
 * @param items {Object[]} objects of items to add to group
 * @param items.name {String} name of item to place in menu
 * @param items.callback {function} function to call when item is clicked
 * @param items.headerTemplate {String} name of template to render in the header
 * @param items.bodyTemplate {String} name of template to render in body
 */
PureAdmin.addMenuItems = function (groupName, items) {
  groupName = groupName.trim();
  PureAdmin._addgroup(groupName);
  var group = PureAdmin._findgroup(groupName);
  items.forEach(function (item) {
    item._id = new Mongo.ObjectID()._str;
    group.items.push(item);
  });
};