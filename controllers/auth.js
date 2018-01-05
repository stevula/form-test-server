const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signup = (req, res, next) => {
  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(422).send({ message: 'Email, firstName, lastName are required.' });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).send({ message: 'Email already taken.' });
      }
      return new User({ email, firstName, lastName }).save().then(user => res.json({
        token: tokenForUser(user),
      }));
    })
    .catch(error => next(error));
};

exports.signin = (req, res, next) => {
  res.json({ token: tokenForUser(req.user) });
};
