const passport = require('passport');
const authController = require('./controllers/auth');
const questionsController = require('./controllers/questions');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', (req, res) => res.json({ message: 'you are home' }));
  app.get('/questions', /*requireAuth, */questionsController.index);
  app.post('/signup', authController.signup);
  app.post('/signin', requireSignin, authController.signin);
};
