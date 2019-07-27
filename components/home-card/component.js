const share = require('../share');

module.exports = class {
  nav() {
    share.path(this.input.href);
  }
};
