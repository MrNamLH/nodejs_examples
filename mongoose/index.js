// Mongo config
const mongoose = require('mongoose');

const user_schema = require('./User');

const mongoUrl = 'mongodb://localhost:27017/contact_db';
mongoose.connect(
  mongoUrl,
  { useCreateIndex: true, useNewUrlParser: true }
);

const User = mongoose.model('User', user_schema);

module.exports = { User };
