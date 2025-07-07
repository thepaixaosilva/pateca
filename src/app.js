const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
// const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const httpStatus = require('http-status');
const { config } = require('./config/environment.config');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(express.json());

app.use(xss());

app.use(compression());

// app.use(cors());
// app.options("*", cors());

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
