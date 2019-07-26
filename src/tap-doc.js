const testhtml = require('./test.html');

module.exports = function (app) {
  app.directive('tapDoc', () => ({
    restrict: 'AE',
    template: testhtml,
  }));
};
