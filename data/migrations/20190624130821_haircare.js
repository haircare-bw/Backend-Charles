
exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(users) {
        users.increments();
        users
            .string('username', 128)
            .notNullable()
            .unique();
        users
            .string('password', 128)
            .notNullable();
        users
            .string('type', 128)
      })

      .createTable('stylists', function(stylists) {
        stylists.increments();
        stylists
            .string('username', 128)
            .notNullable()
            .unique();
        stylists
            .string('about', 256)
            .notNullable();
        stylists
            .string('skills', 256);
        stylists
            .string('password', 128)
            .notNullable();
        stylists
            .string('type', 128);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stylists').dropTableIfExists('users');
  };
