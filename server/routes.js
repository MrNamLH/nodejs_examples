const express = require('express');

const user_router = express.Router();
const post_router = express.Router();

// Middleware that is specify to this router
user_router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);

  next();
});

// User Router
user_router.post('/register', (req, res) => res.send('POST /register'));
user_router.get('/login', (req, res) => res.send('GET /login'));
user_router.get('/:token', (req, res) => res.send('GET /:token'));
user_router.get('/logout', (req, res) => res.send('GET /logout'));

// Post Router
post_router.post('/post', (req, res) => res.send('POST /post'));
post_router.get('/:id', (req, res) => res.send('GET /:id'));
post_router.put('/post', (req, res) => res.send('PUT /post'));
post_router.delete('/:id', (req, res) => res.send('DELETE /:id'));

module.exports = { user_router, post_router };
