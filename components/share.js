const { BehaviorSubject, Subject } = require('rxjs');

module.exports = {
  title: new BehaviorSubject(''),
  toggleDrawer: new Subject()
};
