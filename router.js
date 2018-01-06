const passport = require('passport');
const authController = require('./controllers/auth');
const questionsController = require('./controllers/questions');
const answersController = require('./controllers/answers');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/questions', requireAuth, questionsController.index);
  app.patch('/answers', requireAuth, answersController.update);
  app.post('/signup', authController.signup);
  app.post('/signin', requireSignin, authController.signin);
};
