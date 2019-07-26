const chrome = require('chrome-dev-sync');

chrome({
  server: `${__dirname}/index.js`,
  url: 'http://localhost:3000',
  setup: (self) => {
    self.ignore([/static/, /\.cache/, /\.marko\.js/]);
    return Promise.resolve();
  },
});
