
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'Samantha', password: 'banana', type: 'user' }, // 1
    { username: 'Mary', password: 'banana' }, // 2
    { username: 'Jasmyn', password: 'banana' } // 3
  ]);
};

