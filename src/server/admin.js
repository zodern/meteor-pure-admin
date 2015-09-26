function configureAdminMongo () {
  var AdminCollection = new Meteor.Collection('_PureAdmin-Admins');
  PureAdmin.configure._admin = function(userId) {
    if(userId === null) {
      return false;
    }
    if(AdminCollection.find().count() === 0) {
      AdminCollection.insert({user: userId});
      return true;
    } else if( typeof AdminCollection.findOne({user: userId}) !== 'undefined' ) {
      return true;
    }
    return false;
  }
}

Meteor.startup(function () {
  // check if there is an admin function configured
  if(typeof PureAdmin.configure._admin === "function") {
    return;
  }
  configureAdminMongo();
});
