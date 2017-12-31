const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password are required.' });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).send({ error: 'Email already taken.' });
      }
      return new User({ email, password }).save().then(user => res.json({
        token: tokenForUser(user),
      }));
    })
    .catch(error => next(error));
};
