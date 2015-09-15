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

PureAdmin.addMenuItems('test', [{
  name: 'fun!',
  callback: function () {
    console.log('fun!');
  },
  headerTemplate: 'testHeader',
  bodyTemplate: 'testContent'
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
  },
  'click .col-md-4': function (e, t) {
    var item_id = t.$(e.target).data('id');
    var row_id = t.$(e.target).parent('.row').data('id');
    console.log(item_id);
    console.log(row_id);
    var group = PureAdmin._findGroupById(row_id);
    console.log(PureAdmin._findGroupById(row_id));
    var item = PureAdmin._findItemById(group, item_id);
    item.callback();
    if(item.headerTemplate && item.bodyTemplate) {
      BlazeLayout.render('mainLayout', {header: item.headerTemplate, body: item.bodyTemplate});
    }
    Session.set('showMenu', false);
  }
});

Template.menuTrigger.events({
  'click .menu-trigger': function () {
    Session.set('showMenu', true);
  }
});