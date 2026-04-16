const StatusCodes = require('http-status-codes');
const CustomErrorAPI = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err.name === 'CastError') {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No alien with id: ${err.value}` });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    msg: 'Something went wrong, please try again later',
  });
};

module.exports = errorHandlerMiddleware;
