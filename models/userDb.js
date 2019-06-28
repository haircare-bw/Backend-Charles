const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getAllUsers,
  getById,
  insert,
  update,
  updatePost,
  remove,
  findBy,
  getPostsById,
  getPortfolioById,
  removePost,
};

function get() {
  return db('stylists')
}

function getAllUsers(){
  return db('users')
  .select('email', 'stylist')
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
  return db('posts')
    .insert(user)
}

function update(id, changes) {
  return db('users')
    .where('id', id)
    .update(changes);
}

function updatePost(id, changes) {
  return db('posts')
    .where('id', id)
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}

function removePost(id){
  return db('posts')
  .where('id', id)
  .del();
}