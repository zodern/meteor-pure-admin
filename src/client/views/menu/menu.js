Session.setDefault('showMenu', false);

Template.menu.helpers({
  showMenu: function () {
    return Session.get('showMenu');
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