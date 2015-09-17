Meteor.methods({
  '_pa.isAdmin': function (user) {
    console.log(this.userId);
    return PureAdmin.configure._admin(this.userId);
  }
});
