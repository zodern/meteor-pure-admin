Session.setDefault('ready', false);
var readyInterval = setInterval(function () {
  if(Meteor.status().connected === true) {
    clearInterval(readyInterval);
    Session.set('ready', true);
  } else {
    // trying again usually works
    connectToExistingBackend(window.Meteor_ROOT_URL || '/');
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