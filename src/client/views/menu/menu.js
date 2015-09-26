Session.setDefault('showMenu', false);
Session.setDefault('menuItems', {});


//
//PureAdmin.addMenuItems('test', [{
//  name: 'fun!',
//  callback: function () {
//    console.log('fun!');
//  },
//  headerTemplate: 'testHeader',
//  bodyTemplate: 'testContent'
//}]);


//PureAdmin.addMenuItems('', [{
//  name: 'test2',
//  callback: function () {},
//  headerTemplate: 'dashboardHeader',
//  bodyTemplate: 'dashboardContent'
//}]);

Template.menu.helpers({
  showMenu: function () {
    return Session.get('showMenu');
  },
  row: function () {
    var rows = {};
    PureAdmin._pages.forEach(function (item) {
      if(item.menuGroup in rows) {
        rows[item.menuGroup].items.push(item);
      } else {
        rows[item.menuGroup] = {
          name: item.menuGroup,
          items: [item]
        }
      }
    });

    //convert into array
    var rowsArray = [];
    for (var key in rows) {
      if (rows.hasOwnProperty(key)) {
        rowsArray.push(rows[key]);
      }
    }
    console.log(rowsArray);
    return rowsArray;
  },
  log: function () {
    console.log(this);
  }
});

Template.menu.events({
  'click .close': function () {
    Session.set('showMenu', false);
  },
  'click .menu-item': function (e, t) {
    //var item_id = t.$(e.target).data('id');
    //var row_id = t.$(e.target).parent('.row').data('id');
    //
    //console.log(item_id);
    //console.log(row_id);
    //var group = PureAdmin._findGroupById(row_id);
    //console.log(PureAdmin._findGroupById(row_id));
    //var item = PureAdmin._findItemById(group, item_id);
    //item.callback();
    //if(item.headerTemplate && item.bodyTemplate) {
    //  BlazeLayout.render('mainLayout', {header: item.headerTemplate, body: item.bodyTemplate});
    //}
    Session.set('showMenu', false);
  }
});

Template.menuTrigger.events({
  'click .menu-trigger': function () {
    Session.set('showMenu', true);
  }
});
