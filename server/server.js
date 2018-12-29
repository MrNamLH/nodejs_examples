// const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const models = require('../mongoose');
const { user_router, post_router } = require('./routes');
const { uploader } = require('../util/upload_util');
const { logger } = require('../util/logger');

const app = express();

require('dotenv').config();

// const PORT = process.env.PORT || 3000;

// Connect MongoDB
app.set('models', models);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Home page
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Process form
app.get('/process_post', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/form.html'));
});

app.post('/process_post', (req, res) => {
  const res_data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  console.log(res_data);
  logger.info(res_data);

  res.end(JSON.stringify(res_data));
});

// Upload file
app.get('/upload', (req, res) => {
  console.log(path.resolve(__dirname, '../client/upload.html'));
  logger.info(path.resolve(__dirname, '../client/upload.html'));

  res.sendFile(path.resolve(__dirname, '../client/upload.html'));
});

app.post('/upload', uploader.array('images'), (req, res) => {
  res.json({ images: req.files });
});

// User API
app.use('/user', user_router);

// Post API
app.use('/post', post_router);

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { code: err.code, stack: err.stack });
  // logger.console('test');

  const message =
    process.env.NODE_ENV !== 'production'
      ? err.message
      : 'An error encountered while processing';
  res.status(500).json({ message });

  return next();
});

// START Server
// const server = app.listen(PORT, () => {
//   const hostname = server.address().address;
//   const { port } = server.address();

//   console.log(`Server running at http://${hostname}:${port}/`);
// });

module.exports = { app };
