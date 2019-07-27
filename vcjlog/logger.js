// const winston = require('winston');
const { format, createLogger, transports } = require('winston');
const NestedError = require('nested-error-stacks');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format((info) => {
      info.level = `${info.timestamp} [${info.level.toUpperCase()}]:`;

      let amt = '';
      const isError = info instanceof Error;
      if (isError) {
        amt = info.stack
          .split('\n')
          .slice(1)
          .filter(e => !e.match(/vcjlog/))
          .join('\n')
          .replace(/NestedError: /g, '');
        amt = `\n${amt}`;
      }
      info.message = `${info.message}${amt}`;

      return info;
    })(),
    format.colorize(),

    // winston.format.align(),
    format.printf(info => `${info.level} ${info.message}`),
  ),
});
logger.configure({
  level: 'verbose',
  transports: [
    new transports.Console(),
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});
// console.log(logger);
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
// logger.add(
//   new winston.transports.Console({
//     format: winston.format.colorize(),
//   }),
// );
// const old = logger.debug;
// logger.debug = function (...args) {
//   const trace = stackTrace.get();
//   const { stack } = new Error();
//   //   console.log(stack.split('\n').slice(2));

//   old.apply(logger, (args || []).concat(stack));
// };
// }
logger.e = (msg, err) => new NestedError(msg, err);
module.exports = logger;
