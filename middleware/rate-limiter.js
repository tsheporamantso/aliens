const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    msg: 'Too many requests sent. Try again later.',
  },
});

module.exports = limiter;
