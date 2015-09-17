Session.setDefault('ready', false);
Session.setDefault('isAdmin', false);

var readyInterval = setInterval(function () {
  if(Meteor.status().connected === true) {
    clearInterval(readyInterval);
    Session.set('ready', true);

    // needs to run after we are connected
    Tracker.autorun(function () {
      if(Meteor.userId()) {
        console.log('ran');
        isAdmin();
      }
    });

  } else {
    // trying again usually works
    connectToExistingBackend(window.Meteor_ROOT_URL || '/');
    console.log('not ready');
  }
}, 1000);

function isAdmin() {
  Meteor.call('_pa.isAdmin', function (e, d) {
    console.log(e, d);
    Session.set('isAdmin', d);
  });
}

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
