const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  answers: Array,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
