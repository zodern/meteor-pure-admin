Meteor.methods({
  '_pa.isAdmin': function (user) {
    console.log(this.userId);
    return PureAdmin.configure._admin(this.userId);
  },
  '_pa.files': function () {
    return PureAdmin._files;
  },
  '_pa.templates': function () {
    return PureAdmin._templates;
  }
});
