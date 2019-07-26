const home = require('../components/home');

module.exports = function (app) {
  app.factory('marko', () => ({
    home,
  }));
};
