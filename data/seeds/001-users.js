const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { username: 'Samantha', password: bcrypt.hashSync('banana', 10), type: 'user' }, // 1
    { username: 'Mary', password: bcrypt.hashSync('banana', 10) }, // 2
    { username: 'Jasmyn', password: bcrypt.hashSync('banana', 10) } // 3
  ]);
};

