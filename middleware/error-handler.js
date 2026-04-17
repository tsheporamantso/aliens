const StatusCodes = require('http-status-codes');
const mongoose = require('mongoose');
const CustomErrorAPI = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: message });
  }

  if (err.code === 11000) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: 'Email already in use' });
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
