const passport = require('passport');
const authController = require('./controllers/auth');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/restricted', requireAuth, (req, res) => (
    res.json({ message: 'hi' })
  ));
  app.post('/signup', authController.signup);
  app.post('/signin', requireSignin, authController.signin);
};
