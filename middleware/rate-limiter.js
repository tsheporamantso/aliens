const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, // max 5 request per IP,
  message: {
    success: false,
    msg: 'Too many requests sent. Try again later.',
  },
});

module.exports = limiter;
