const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).send({ error: 'Email already taken.' });
      }
      return new User({ email, password }).save().then(() => res.json({
        success: true,
      }));
    })
    .catch(error => next(error));
};
