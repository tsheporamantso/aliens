const StatusCodes = require('http-status-codes');
const CustomErrorAPI = require('./custom-error');

class BadRequestError extends CustomErrorAPI {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

module.exports = BadRequestError;
