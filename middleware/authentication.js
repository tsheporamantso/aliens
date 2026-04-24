const jwt = require('jsonwebtoken');
const CustomError = require('../errors');

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    return next(new CustomError.UnauthenticatedError('Authentication invalid'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    return next();
  } catch (error) {
    return next(new CustomError.UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = {
  authenticateUser,
};
