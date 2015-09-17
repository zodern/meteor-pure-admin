if(Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'test',
    password: 'test'
  });
}
