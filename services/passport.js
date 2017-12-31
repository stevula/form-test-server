const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config');

// specify custom username field
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (user) {
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (isMatch) return done(null, user);
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, false));
});

const jwtOptions = {
  // specify location of jwt in request
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => done(null, user || false))
    .catch(error => done(error, false));
});

passport.use(jwtLogin);
passport.use(localLogin);
