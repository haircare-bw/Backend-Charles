
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
  .then(function () {
      // Inserts seed entries
      return knex('stylists').insert([
        {user_id: 2, username: 'Charles', about: 'I am a stylist that has in eye for detail making my cuts and color stand out more than my peers', skills: 'cut color'}, //1
        {user_id: 3, username: 'Ashley', about: 'I am a stylist that has in eye for detail making my styles stand out more than my peers', skills: 'up-dos down-dos'}, //2
        {user_id: 4, username: 'Jessica', about: 'I am an all around hair stylist great at every part of the process', skills: 'cut color styles nails'} //3
      ]);
  });
};
