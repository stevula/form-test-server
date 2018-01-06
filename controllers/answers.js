const User = require('../models/user');

exports.update = (req, res, next) => {
  console.log(req.body)
  const { email, questionNumber, answer } = req.body;

  if (!email || !questionNumber || !answer) {
    return res.status(409).send({ message: 'Bad payload' });
  }

  return User.findOne({ email })
    .then((user) => {
      console.log('user: ', user)
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      const answers = [...user.answers];
      answers[questionNumber] = answer;
      user.answers = answers;
      user.save();
      return res.status(200).send({ success: true });
    })
    .catch(error => next(error));
};
