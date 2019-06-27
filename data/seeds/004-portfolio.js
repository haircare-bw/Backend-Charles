
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('portfolio').del()
    .then(function () {
      // Inserts seed entries
      return knex('portfolio').insert([
        {stylists_id: 1},
        {stylists_id: 1},
        {stylists_id: 1},
        {stylists_id: 1},
        {stylists_id: 2},
        {stylists_id: 2},
        {stylists_id: 2},
        {stylists_id: 2},
        {stylists_id: 3},
        {stylists_id: 3},
        {stylists_id: 3},
        {stylists_id: 3},
      ]);
    });
};
