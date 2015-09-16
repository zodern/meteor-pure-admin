function connectToExistingBackend(url) {
  //
  // make a remote connection and set the global connection object to it
  Meteor.connection = DDP.connect(url);
  // make sure Accounts uses that connection
  Accounts.connection = Meteor.connection;
  //
  // this is copied from ddp/*/web.browser/packages/ddp.js
  // it makes sure all method calls are done with the correct connection
  //
  _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect',                                         // 52
      'disconnect'],                                                                                          // 53
    function (name) {                                                                                        // 54
      Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);                                     // 55
    });                                                                                                      // 56
  //
  // we need re-declare the users collection so Meteor knows to use the remote one
  //
  Meteor.users = new Meteor.Collection('users');
  //
  // now that we have our act together, try to re-login
  // unfortunately Accounts seems to have already run before
  // we did the Meteor.connection = DDP.connect part, so we manually
  // need to re-check the loginToken or hot code pushes log us out every time
  //
  var token = Accounts._storedLoginToken();
  if (token) {
    Meteor.loginWithToken(token, function (err) {
      // this is going to throw error if we logged out
      if (err) console.log(err); else console.log('loginWithToken');
    });
  }
}

Meteor.disconnect();
connectToExistingBackend(window.Meteor_ROOT_URL || '/');
RemoteAutoupdate(window.Meteor_ROOT_URL || '/');