const app = require('./app');

const aa = require('./markod');
const ab = require('./routes');
const ac = require('./tap-doc');

const items = [aa, ab, ac].map(f => f(app));

angular.element(document).ready(() => {
  Promise.resolve(items).then(() => {
    angular.bootstrap(document, [app.name]);
  });
  // console.log(app);
});
