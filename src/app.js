const app = angular.module('app', ['ngRoute']);

app.directive('test', () => ({
  restrict: 'AE',
  template: '<h1>xxxxxxxxxxxxxx</h1>',
}));
app.directive('r', [
  '$routeParams',
  '$location',
  'marko',
  ($routeParams, $location, marko) => ({
    restrict: 'AE',
    // template: "<h1>xxxxxxxxxxxxxx</h1>",
    link(scope, iElm) {
      // debugger;
      const page = new URL(location.href).pathname.split('/')[1];
      console.log($routeParams.page, marko);

      marko[page].render({ svc: marko.svc }).then((res) => {
        res.replace(iElm[0]);
        // scope.$destroy();
      });
    },
  }),
]);
module.exports = app;
