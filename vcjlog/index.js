const Bottle = require('bottlejs');
const request = require('request-promise');
const logger = require('./logger');
const fptApi = require('./fpt-tts');
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
bottle.service('db', db, 'root');
bottle.value('app', {});
bottle.value('root', `${global.rootDir}`);
module.exports = bottle.container;
