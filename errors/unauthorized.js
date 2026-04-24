const StatusCodes = require('http-status-codes');
const CustomErrorAPI = require('./custom-error');

class UnauthorizedError extends CustomErrorAPI {
  constructor(message, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

module.exports = UnauthorizedError;
