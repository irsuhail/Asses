const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SECRET_QUESTIONS } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    secretQuestion: { type: String, enum: SECRET_QUESTIONS, required: true },
    secretAnswerHash: { type: String, required: true }
  },
  { timestamps: true }
);

// Hide sensitive fields when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.secretAnswerHash;
  return obj;
};

// Helpers
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.compareSecretAnswer = function (plain) {
  return bcrypt.compare(plain, this.secretAnswerHash);
};

// Static helper to hash password/secret
userSchema.statics.hash = async function (plain) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plain, salt);
};

module.exports = mongoose.model('User', userSchema);
