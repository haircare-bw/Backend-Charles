
exports.up = function(knex) {
    return knex.schema   
    .createTable('users', function(users) {
        users.increments();
        users
            .string('email', 128)
            .notNullable()
            .unique();
        users
            .string('password', 128)
            .notNullable();
        users
        .boolean('stylist');
    })

    .createTable('stylists', function(stylists) {
        stylists
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        stylists
            .string('username', 255)
            .notNullable()
        stylists
            .string('about', 256)
            .notNullable();
        stylists
            .string('skills', 256);
        stylists
            .string('profile_img', 255)
            .defaultTo('https://source.unsplash.com/200x200/?hair')
    })
        
    .createTable('posts', function(posts) {
        posts
            .increments();
        posts
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('stylists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        posts
            .string('title', 255)
            .notNullable()
        posts
            .string('posts_image', 255)
            .defaultTo('https://source.unsplash.com/400x400/?hair')
        posts
            .string('description', 255);
    })
    .createTable('portfolio', function(portfolio) {
        portfolio
            .increments();
        portfolio
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('user_id')
            .inTable('stylists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        portfolio
            .string('portfolio_image', 255)
            .defaultTo('https://source.unsplash.com/400x400/?hair')
    });
};
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('stylists')
        .dropTableIfExists('posts')
        .dropTableIfExists('portfolio')
  };
