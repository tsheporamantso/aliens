const StatusCodes = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
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
