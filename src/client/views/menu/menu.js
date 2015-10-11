Session.setDefault('showMenu', false);

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
    //console.log(rowsArray);
    return rowsArray;
  },
  log: function () {
    //console.log(this);
  }
});

Template.menu.events({
  'click .close': function () {
    Session.set('showMenu', false);
  },
  'click .menu-item': function () {
    Session.set('showMenu', false);
  }
});

Template.menuTrigger.events({
  'click .menu-trigger': function () {
    Session.set('showMenu', true);
  }
});
