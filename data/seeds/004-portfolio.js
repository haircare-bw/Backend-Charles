
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('portfolio').del()
    .then(function () {
      // Inserts seed entries
      return knex('portfolio').insert([
        {user_id: 1},
        {user_id: 1},
        {user_id: 1},
        {user_id: 1},
        {user_id: 2},
        {user_id: 2},
        {user_id: 2},
        {user_id: 2},
        {user_id: 3},
        {user_id: 3},
        {user_id: 3},
        {user_id: 3},
      ]);
    });
};
