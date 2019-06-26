
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
      })
      
      .createTable('posts', function(posts) {
        posts.increments();
        posts
            .string('title', 128)
            .notNullable()
        posts
            .string('image', 256)
            .defaultTo('https://source.unsplash.com/400x400/?hair')
            .notNullable();
        posts
            .string('type', 128);
        posts
        .integer('stylistsId')
        .unsigned()
        .notNullable();
        posts
        .foreign('stylistsId')
        .references('id')
        .inTable('stylists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts').dropTableIfExists('stylists').dropTableIfExists('users')
  };
