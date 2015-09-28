Template.paInfoButton.onCreated(function () {
  TemplateVar.set('showInfo', false);
});
Template.paInfoButton.helpers({
  'showInfo': function () {
    return TemplateVar.get('showInfo');
  }
});
Template.paInfoButton.events({
  'click .paInfoCircle': function (e, t) {
    // toggle
    TemplateVar.set('showInfo', !TemplateVar.get('showInfo'));
  }
});

Template.paInfo.helpers({
  'connection': function () {
    return Meteor.status().status;
  },
  'connectionUrl': function () {
    return window.Meteor_ROOT_URL || '/';
  },
  emailOrUsername: function () {
    return Meteor.user().username || Meteor.user().emails[0].address;
  }
});