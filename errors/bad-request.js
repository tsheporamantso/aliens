const CustomErrorAPI = require('./custom-error');
const StatusCodes = require('http-status-codes');

class BadRequestError extends CustomErrorAPI {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

module.exports = BadRequestError;
