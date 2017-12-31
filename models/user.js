const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    return bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      return next();
    });
  });
});

const User = mongoose.model('user', userSchema);

module.exports = User;
