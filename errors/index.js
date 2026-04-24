const BadRequestError = require('./bad-request');
const CustomErrorAPI = require('./custom-error');
const NotFoundError = require('./not-found');
const UnauthenticatedError = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');

module.exports = {
  BadRequestError,
  CustomErrorAPI,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
