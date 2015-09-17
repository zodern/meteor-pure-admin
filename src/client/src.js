Session.setDefault('ready', false);
Session.setDefault('isAdmin', false);

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

function isAdmin () {
  Meteor.call('_pa.isAdmin', function (e, d) {
    console.log(e, d);
    Session.set('isAdmin', d);
  });
}

Tracker.autorun(function () {
  if(Meteor.userId()) {
    isAdmin();
  }
});



  // counter starts at 0
  Session.setDefault('counter', 0);
  Template.main.helpers({
    ready: function () {
      if(Session.get('ready') === true) {
        //BlazeLayout.render('mainLayout', {header: 'dashboardHeader', body: 'dashboardContent'})
      }
      return Session.get('ready');
    },
    adminUser: function () {
      return Session.get('isAdmin') && Meteor.user();
    }
  });
