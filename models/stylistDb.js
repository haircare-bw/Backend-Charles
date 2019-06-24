const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('stylists');
}

function findBy(filter) {
  return db('stylists')
  .where(filter);
}

function getById(id) {
  return db('stylists')
    .where({ id })
    .first();
}

function insert(stylist) {
  return db('stylists')
    .insert(stylist)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('stylists')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('stylists')
    .where('id', id)
    .del();
}
