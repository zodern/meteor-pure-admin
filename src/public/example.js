PureAdmin.addPage('{adminRoute}/test', 'test', 'Test Page');

PureAdmin.adminRoutes.route('/test', {
  action: function () {
    BlazeLayout.render('main', {header: 'exampleHeader', body: 'exampleBody'});
  }
});

Template.exampleBody.helpers({
  'testHelper': function () {
    return 'yes'
  }
});


TestWasLoaded = true;
console.log('test.js');
