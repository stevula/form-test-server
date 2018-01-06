const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// specify custom username field
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then(user => done(null, user || false))
    .catch(error => done(error, false));
});

const jwtOptions = {
  // specify location of jwt in request
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.secret || require('../config').secret,
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => done(null, user || false))
    .catch(error => done(error, false));
});

passport.use(jwtLogin);
passport.use(localLogin);
