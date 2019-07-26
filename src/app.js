const app = angular.module('app', ['ngRoute']);

app.directive('test', () => ({
  restrict: 'AE',
  template: '<h1>xxxxxxxxxxxxxx</h1>',
}));
app.directive('r', [
  '$routeParams',
  'marko',
  ($routeParams, marko) => ({
    restrict: 'AE',
    // template: "<h1>xxxxxxxxxxxxxx</h1>",
    link(scope, iElm) {
      // debugger;
      // console.log($routeParams.page, attrs.r, marko);
      marko[$routeParams.page].render({}).then((res) => {
        res.replace(iElm[0]);
        // scope.$destroy();
      });
    },
  }),
]);
module.exports = app;
