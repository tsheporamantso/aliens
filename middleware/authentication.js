const UnauthenticatedError = require('../errors/unauthenticated');
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload._id, name: payload.name };
    next();
  } catch (error) {
    return next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = authentication;
