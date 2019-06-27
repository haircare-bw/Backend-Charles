const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  findBy,
  getPostsById,
  getPortfolioById,
};

function get() {
  return db('stylists')
}

function findBy(filter) {
  return db('users')
  .where(filter);
}

function getById(id) {
  return db('stylists')
  .where('stylists.id', id)
  .first()
}

function getPostsById(id) {
  return db('posts')
  .where('posts.stylists_id', id)
}

function getPortfolioById(id) {
  return db('portfolio')
  .where('portfolio.stylists_id', id)
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where('id', id)
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
