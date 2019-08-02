const Bottle = require('bottlejs');
const request = require('request-promise');
const logger = require('./logger');
const fptApi = require('./fpt-tts');
const vtApi = require('./vt-tts');
const ggApi = require('./google-tts');
const db = require('./db');

const bottle = new Bottle();

function NewError(...args) {
  const fn = logger.e;
  return fn.apply(logger, args);
}

bottle.value('logger', logger);
bottle.value('E', NewError);
bottle.value('request', request);
bottle.service('fptApi', fptApi, 'request', 'logger', 'E');
bottle.service('vtApi', vtApi, 'request', 'logger', 'E');
bottle.service('ggApi', ggApi, 'request', 'logger', 'E');
function speechApi(fptApi, vtApi, ggApi) {
  // console.log(ggApi);
  return ggApi;
}
bottle.service('speechApi', speechApi, 'fptApi', 'vtApi', 'ggApi');
bottle.service('db', db, 'root');
bottle.value('app', {});
bottle.value('root', `${__dirname}/..`);
module.exports = bottle.container;
