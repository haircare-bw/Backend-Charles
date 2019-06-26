const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
 // Inserts seed entries
    return knex('users').insert([
      { email: 'kedasha@yahoo.com', password: bcrypt.hashSync('kerr', 10), 'stylist': true }, //1
      { email: 'charles@yahoo.com', password: bcrypt.hashSync('kerr', 10),  'stylist': true }, //2
      { email: 'ashley@yahoo.com', password: bcrypt.hashSync('kerr', 10),  'stylist': true }, //3
      { email: 'jessica@yahoo.com', password: bcrypt.hashSync('kerr', 10),  'stylist': true }, //4

    ]);
};

