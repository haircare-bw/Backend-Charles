
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id:'1', title: 'My first', description: 'this is my first post and I feel really good about it'},
        {user_id:'1', title: 'My second', description: 'this is my second post and I feel really good about it'},
        {user_id:'2', title: 'My first', description: 'this is my first post and I feel really good about it'},
        {user_id:'2', title: 'My second', description: 'this is my second post and I feel really good about it'},
        {user_id:'3', title: 'My first', description: 'this is my first post and I feel really good about it'},
        {user_id:'3', title: 'My second', description: 'this is my second post and I feel really good about it'},
      ]);
    });
};
