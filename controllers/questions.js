const questions = require('../data/questions.json');

exports.index = ((req, res, next) => {
  return res.send(questions);
});
