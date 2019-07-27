module.exports = function (app) {
  app.config([
    '$routeProvider',
    '$locationProvider',
    function (routeProvider, $locationProvider) {
      routeProvider
        .when('/', {
          redirectTo: '/home',
        })
        // .when('/hoa-qua/:page', {
        //   template: params => '<div r="hoa-qua"></div>',
        // })
        .when('/:page*', {
          template: params => `<div r="${params.page}"></div>`,
        });
      $locationProvider.html5Mode(true);
    },
  ]);
};
