/* eslint-disable linebreak-style */
// global.rootDir = __dirname;
require('marko/node-require');
const lasso = require('lasso');
const express = require('express');
const fs = require('fs');
const Q = require('q');

const lsm = require('lasso-marko');
const lss = require('lasso-less');
const lsh = require('lasso-html');
const { db, logger, speechApi } = require('./vcjlog');

// console.log(__dirname);
lasso.configure({
  plugins: [
    // Plugin with a default config:

    // require("lasso-sass"),
    lsm,
    lss,
    lsh
    // require("./lasso-babel")
  ],
  // The base output directory for generated bundles
  outputDir: 'static',

  // Optional URL prefix to prepend to relative bundle paths
  // "urlPrefix": "http://mycdn/static",

  // If fingerprints are enabled then a shasum will be included in the URL.
  // This feature is used for cache busting.
  fingerprintsEnabled: true,

  // If fingerprints are not enabled then the same output file would be
  // used for bundles that go into the head and bundles that go in the
  // body. Enabling this option will ensure that bundles have unique names
  // even if fingerprints are disabled.
  // "includeSlotNames": false,

  // If "minify" is set to true then output CSS and JavaScript will run
  // through a minification transform. (defaults to false)
  minify: false,

  minifyJS: false, // Minify JavaScript

  minifyCSS: false, // Minify CSS

  minifyInlineOnly: false, // Only minify inline resources

  minifyInlineJSOnly: false, // Only minify inline JavaScript resources

  minifyInlineCSSOnly: false, // Only minify inline CSS resources

  // If "resolveCssUrls" is set to true then URLs found in CSS files will be
  // resolved and the original URLs will be replaced with the resolved URLs.
  // (defaults to true)
  resolveCssUrls: false,

  // If "relativeUrlsEnabled" is set to false then URLs found in CSS files will
  // be absolute based on the urlPrefix. This default is false, which creates
  // relative URLs in CSS files.
  relativeUrlsEnabled: true,

  // If "bundlingEnabled" is set to true then dependencies will be concatenated
  // together into one or more bundles. If set to false then each dependency
  // will be written to a separate file. (defaults to true)
  bundlingEnabled: true,
  bundles: [
    {
      name: 'app',
      dependencies: ['require:./src/**/*.*', 'require:./components/**/*.*']
    }
  ]
});

const app = express();
const lock = {};
async function createMp3(url) {
  const data = await Q.fcall(() => {
    let rs = null;
    // const { url } = req;
    // console.error(req.url);
    if (url.match(/\/sounds\//)) {
      const fileName = `${__dirname}/${url}`;
      if (!fs.existsSync(fileName)) {
        const key = url.split('/');
        const k = key[key.length - 1].split('.mp3')[0];
        rs = { key: k, fileName };
        if (!lock[rs.key]) {
          logger.debug('locking data', rs);
          lock[rs.key] = true;
        } else {
          rs = null;
        }
      }
    }

    return rs;
  });
  if (data) {
    await Q.fcall(async () => {
      const fn = db
        .read()
        .filter((e) => {
          if (db.isArray(e)) {
            // console.log(e);
            return e;
          }
          // console.log(e);
          return null;
        })
        .value();

      const qq = [].concat.apply([], fn);
      const found = qq.filter(o => o.key == data.key);
      if (found) {
        await speechApi.saveTTS(data.fileName, found[0].title);
      }
    });
    lock[data.key] = false;
  }
}

app.use(async (req, res, next) => {
  await createMp3(req.url);
  next();
});
// app.use(markoExpress()); //enable res.marko(template, data)
app.use(require('lasso/middleware').serveStatic());

app.use('/favicon.jpg', express.static('./favicon.jpg'));
app.use('/manifest.json', express.static('./manifest.json'));

app.use('/images', express.static('./images'));
app.use('/sounds', express.static('./sounds'));

const home = require('./pages/home/index.marko');

app.get('/data/:type', (req, res) => {
  logger.debug(`request data type ${req.params.type}`);
  const data = db.get(req.params.type).value();
  if (data) {
    res.json(data);
  } else {
    res.json([]);
  }
});
app.get('*', (req, res) => {
  home.render({}, res);
});

app.listen(3000, () => {
  if (process.send) process.send('online');
});
