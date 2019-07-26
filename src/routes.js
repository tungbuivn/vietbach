module.exports = function (app) {
  app.config([
    '$routeProvider',
    '$locationProvider',
    function (routeProvider, $locationProvider) {
      routeProvider
        .when('/', {
          redirectTo: '/home',
        })
        .when('/:page', {
          template: params => `<div r="${params.page}"></div>`,
        });
      $locationProvider.html5Mode(true);
    },
  ]);
};
