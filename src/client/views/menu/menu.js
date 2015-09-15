Session.setDefault('showMenu', false);
Session.setDefault('menuItems', {});

if (typeof PureAdmin === 'undefined') {
  PureAdmin = {};
}
PureAdmin._groups = [];

PureAdmin._addgroup = function (name) {
  if (typeof PureAdmin._findgroup(name) !== 'undefined') {
    return;
  }
  PureAdmin._groups.push({
    _id: new Mongo.ObjectID()._str,
    name: name,
    items: []
  });
};

PureAdmin._findgroup = function (name) {
  return _.find(PureAdmin._groups, function (item) {
    return item.name === name;

  });
};

/**
 * Adds items to the menu in Pure Admin. Is synced
 * @param groupName {String} name of menu group
 * @param items {Object[]} objects of items to add to group
 * @param items.name {String} name of item to place in menu
 * @param items.callback {function} function to call when item is clicked
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

PureAdmin.addMenuItems('test', [{
  name: 'fun!',
  callback: function () {
    console.log('fun!');
  }
}]);

Template.menu.helpers({
  showMenu: function () {
    return Session.get('showMenu');
  },
  row: function () {
    return PureAdmin._groups;
  }
});

Template.menu.events({
  'click .close': function () {
    Session.set('showMenu', false);
  }
});

Template.menuTrigger.events({
  'click .menu-trigger': function () {
    Session.set('showMenu', true);
  }
});