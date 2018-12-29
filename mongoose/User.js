const mongoose = require('mongoose');

const validateSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    expiredAt: { type: Date, required: true }
  },
  {
    _id: false
  }
);

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    activation: validateSchema,
    passwordRecovery: validateSchema,
    name: { first: String, last: String, middle: String },
    activatedAt: Date,
    lockedAt: Date
  },
  { timestamps: true }
);

module.exports = schema;
