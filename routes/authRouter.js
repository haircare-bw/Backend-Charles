require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/userDb.js');
const secrets = require('../configs/secrets.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users
    .insert(user)//uses add from users-model
    .then(saved => {
      res.status(201).json({
        message: 'You have Successfully registered', saved});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })//uses findby from users-model
    .first()
    .then(user => {
      // console.log('this is from login', user);
      if (user && bcrypt.compareSync(password, user.password)) {
        //generate a token
        const token = genToken(user);
        // console.log('this is the token', token);
        const ID = user.id;
        const type = user.stylist;
        res.status(200).json({
          message: `Welcome!`,
          token,// added token
          ID,
          type 
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function genToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    stylist: user.stylist

  };
  const options ={
    expiresIn: '1d',
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
