const Bottle = require('bottlejs');
const logger = require('./logger');

const bottle = new Bottle();

function NewError(...args) {
  const fn = logger.e;
  return fn.apply(logger, args);
}

bottle.value('logger', logger);
bottle.value('E', NewError);
bottle.value('app', {});

module.exports = bottle.container;
