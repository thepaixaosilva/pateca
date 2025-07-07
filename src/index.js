/* eslint-disable no-console */
const sequelize = require('./config/database/database.config');
const { validateConfig, config } = require('./config/environment.config');
const app = require('./app');

validateConfig();

let server;
sequelize.sync().then(() => {
  console.log('Connected to database');
  server = app.listen(config.server.port, () => {
    console.log(`Listening to port ${config.server.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) server.close(() => console.log('Server closed.'));
});
