/* eslint-disable no-console */
const { DatabaseError } = require('sequelize');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { config } = require('../config/environment.config');

const errorConverter = (err, req, res, next) => {
  console.error(err);
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof DatabaseError
        ? httpStatus.status.BAD_REQUEST
        : httpStatus.status.INTERNAL_SERVER_ERROR;

    const message = error.message || httpStatus.message[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.status.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    error: message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
