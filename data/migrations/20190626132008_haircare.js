
exports.up = function(knex) {
    return knex.schema
    .createTable('type', function(type){
        type.increments();
        type.string('description', 255);
    })    

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
            .integer('type')
            .unsigned()
            .notNullable();
        users
            .foreign('typeId')
            .references('id')
            .inTable('type')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })

    .createTable('stylists', function(stylists) {
        stylists
            .integer('user_id')
            .unsigned()
            .notNullable();
        stylists
            .foreign('usersId')
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
            .blob('profile_img')
            .defaultTo('https://source.unsplash.com/200x200/?hair')
            .notNullable();
    })
        
    .createTable('posts', function(posts) {
        posts
            .increments();
        posts
            .integer('user_id')
            .unsigned()
            .notNullable();
        posts
            .foreign('stylistsId')
            .references('id')
            .inTable('stylists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        posts
            .string('title', 255)
            .notNullable()
        posts
            .string('image', 256)
            .defaultTo('https://source.unsplash.com/400x400/?hair')
            .notNullable();
        posts
            .string('description', 255);
    })
    .createTable('portfolio', function(portfolio) {
        portfolio
            .increments();
        portfolio
            .integer('user_id')
            .unsigned()
            .notNullable();
        portfolio
            .foreign('stylistsId')
            .references('id')
            .inTable('stylists')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        portfolio
            .string('image', 256)
            .defaultTo('https://source.unsplash.com/400x400/?hair')
            .notNullable();
    });
};
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('type')
        .dropTableIfExists('users')
        .dropTableIfExists('stylists')
        .dropTableIfExists('posts')
        .dropTableIfExists('portfolio')
  };
