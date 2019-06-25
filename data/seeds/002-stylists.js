const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('stylists').insert([
        {username: 'Charles', about: 'I am a stylist that has in eye for detail making my cuts and color stand out more than my peers', skills: 'cut color', password: bcrypt.hashSync('banana', 10), type: 'stylist'}, //1
        {username: 'Ashley', about: 'I am a stylist that has in eye for detail making my styles stand out more than my peers', skills: 'up-dos down-dos', password: bcrypt.hashSync('banana', 10), type: 'stylist'}, //2
        {username: 'Jessica', about: 'I am an all around hair stylist great at every part of the process', skills: 'cut color styles nails', password: bcrypt.hashSync('banana', 10), type: 'stylist'} //3
      ]);
   
};
