var adminRoutes = FlowRouter.group({
  prefix: "/admin"
});

adminRoutes.route('/', {
  action: function() {
    BlazeLayout.render('main',{header: 'dashboardHeader', body: 'dashboardContent'} );
  }
});
