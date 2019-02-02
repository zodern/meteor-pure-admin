export const PureAdmin = {};

function configureAdminMongo () {
  var AdminCollection = new Mongo.Collection('_PureAdmin-Admins');
  PureAdmin.isAdmin = function(userId) {
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
  if(typeof PureAdmin.isAdmin === "function") {
    return;
  }
  configureAdminMongo();
});

Meteor.methods({
  '_pa.isAdmin': function () {
    return PureAdmin.isAdmin(this.userId);
  }
});
