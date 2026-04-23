const StatusCodes = require('http-status-codes');
const CustomErrorAPI = require('./custom-error');

class NotFoundError extends CustomErrorAPI {
  constructor(message, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

module.exports = NotFoundError;
