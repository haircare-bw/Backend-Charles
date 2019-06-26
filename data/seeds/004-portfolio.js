
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('portfolio').del()
    .then(function () {
      // Inserts seed entries
      return knex('portfolio').insert([
        {user_id: 1, image: ''},
        {user_id: 1, image: ''},
        {user_id: 1, image: ''},
        {user_id: 1, image: ''},
        {user_id: 2, image: ''},
        {user_id: 2, image: ''},
        {user_id: 2, image: ''},
        {user_id: 2, image: ''},
        {user_id: 3, image: ''},
        {user_id: 3, image: ''},
        {user_id: 3, image: ''},
        {user_id: 3, image: ''},
      ]);
    });
};
