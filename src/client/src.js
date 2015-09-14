Session.setDefault('ready', false);
var readyInterval = setInterval(function () {
  if(Meteor.status().connected === true) {
    clearInterval(readyInterval);
    Session.set('ready', true);
  } else {
    console.log('not ready');
  }
}, 1000);



  // counter starts at 0
  Session.setDefault('counter', 0);
  Template.main.helpers({
    ready: function () {
      return Session.get('ready');
    }
  });
  Template.info.helpers({

    counter: function () {
      return Session.get('counter');
    },
    'version': function () {
      return '1';
    },
    'connection': function () {
      return Meteor.status().connected + ', ' + Meteor.status().status;
    },
    email: function () {
      return Meteor.user().emails[0].address;
    }
  });

  Template.info.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });