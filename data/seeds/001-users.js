const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
 // Inserts seed entries
    return knex('users').insert([
      { username: 'kedasha', password: bcrypt.hashSync('kerr', 10), type: 'user' }
    ]);
};

