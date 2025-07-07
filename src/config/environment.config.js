/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'test',
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || './database.sqlite',
    dialect: process.env.DB_DIALECT || 'sqlite',
  },
  server: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};

const validateConfig = () => {
  const requiredFields = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];

  requiredFields.forEach((field) => {
    if (!process.env[field]) {
      console.error(`Missing environment variable: ${field}`);
      process.exit(1);
    }
  });

  if (config.db.dialect !== 'sqlite' && !process.env.DB_HOST) {
    console.error('DB_HOST is required for non-SQLite databases');
    process.exit(1);
  }

  if (config.jwt.expiresIn && !/^\d+[smhd]$/.test(config.jwt.expiresIn)) {
    console.error(
      "JWT_EXPIRES_IN must be in the format of a number followed by 's', 'm', 'h', or 'd'",
    );
    process.exit(1);
  }

  if (config.server.port && Number.isNaN(config.server.port)) {
    console.error('PORT must be a number');
    process.exit(1);
  }
};

module.exports = {
  config,
  validateConfig,
};
