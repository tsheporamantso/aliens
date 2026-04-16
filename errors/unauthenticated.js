const StatusCodes = require('http-status-codes');
const CustomErrorAPI = require('./custom-error');

class UnauthenticatedError extends CustomErrorAPI {
  constructor(message, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

module.exports = Unauthenticated;
