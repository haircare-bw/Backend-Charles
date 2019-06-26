const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  findBy,
};

function get() {
  return db('stylists')
}

function findBy(filter) {
  return db('users')
  .where(filter);
}

function getById(user_id) {
  return db('stylists')
  .join('posts', 'stylists.user_id', 'posts.user_id')
  .join('portfolio', 'stylists.user_id', 'portfolio.user_id' )
  .select('stylists.username', 'stylists.about', 'stylists.skills', 'stylists.profile_img', 'posts.title', 'posts.posts_image', 'posts.description', 'portfolio.portfolio_image')
  .where('stylists.user_id', user_id)

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
