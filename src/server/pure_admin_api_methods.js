Meteor.methods({
  '_pa.isAdmin': function (user) {
    console.log(this.userId);
    return PureAdmin.isAdmin(this.userId);
  },
  '_pa.files': function () {
    return PureAdmin._files;
  },
  '_pa.templates': function () {
    return PureAdmin._templates;
  },
  '_pa.styleSheets': function () {
    return PureAdmin._styleSheets;
  }
});
