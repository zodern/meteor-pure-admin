var routeOnLoad;

Tracker.autorun(function () {
  if(Inject.isLoaded.get()) {
    if(typeof routeOnLoad === "undefined") {
      return;
    }
    FlowRouter.go(routeOnLoad);
  }
});

//global
PureAdmin.routePrefix = '/admin';
PureAdmin.adminRoutes = FlowRouter.group({
  prefix: PureAdmin.routePrefix,
  name: 'admin'
});

PureAdmin.adminRoutes.route('/', {
  action: function() {
    BlazeLayout.render('main',{header: 'dashboardHeader', body: 'dashboardContent'} );
  }
});

FlowRouter.notFound = {
  action: function() {
    routeOnLoad = FlowRouter.current().path;
    console.log('not found');
    FlowRouter.go(PureAdmin.routePrefix);

  }
};
