const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');

const authentication = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    return next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = authentication;
