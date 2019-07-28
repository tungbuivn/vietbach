const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = function (root) {
  const adapter = new FileSync(`${root}/data/db.json`);
  const db = low(adapter);
  db.defaults({ dongvat: [], thucvat: [] }).write();
  return db;
};
