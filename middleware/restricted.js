const jwt = require('jsonwebtoken');

const secrets = require('../configs/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
    if(err) {
      res.status(401).json({ message: 'Invalid Credentials' });
    }else{
    req.user = { stylist: decodeToken.stylist }; //<===only really needed if I am going to use the decodeToken param
      next();
    }
  });
} else {
  res.status(400).json({ message: 'No credentials provided' });
   }
};
