const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
 // Inserts seed entries
    return knex('users').insert([
      { email: 'kedasha@yahoo.com', password: bcrypt.hashSync('kerr', 10), type: 'stylist' }, //1
      { email: 'charles@yahoo.com', password: bcrypt.hashSync('kerr', 10), type: 'stylist' }, //2
      { email: 'ashley@yahoo.com', password: bcrypt.hashSync('kerr', 10), type: 'stylist' }, //3
      { email: 'jessica@yahoo.com', password: bcrypt.hashSync('kerr', 10), type: 'stylist' }, //4

    ]);
};

