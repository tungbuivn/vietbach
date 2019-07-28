const chrome = require('chrome-dev-sync');

chrome({
  server: `${__dirname}/index.js`,
  url: 'http://localhost:3000',
  setup: (self) => {
    self.ignore([/static/, /\.cache/, /^data/, /\.marko\.js/]);
    return Promise.resolve();
  },
});
