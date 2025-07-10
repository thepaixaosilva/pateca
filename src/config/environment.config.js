/* eslint-disable no-console */
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Application configuration object that centralizes all environment-based settings.
 *
 * This configuration loads settings from environment variables with sensible
 * defaults for development. The configuration is structured into logical
 * sections for different application concerns.
 *
 * @typedef {Object} Config
 * @property {string} env - Application environment (development, production, test)
 * @property {DatabaseConfig} db - Database connection settings
 * @property {ServerConfig} server - Server configuration settings
 * @property {JwtConfig} jwt - JWT authentication settings
 */

/**
 * Database configuration settings.
 *
 * @typedef {Object} DatabaseConfig
 * @property {string} name - Database name
 * @property {string} user - Database user
 * @property {string} password - Database password
 * @property {string} host - Database host or file path for SQLite
 * @property {string} dialect - Database dialect (sqlite, postgres, mysql, etc.)
 */

/**
 * Server configuration settings.
 *
 * @typedef {Object} ServerConfig
 * @property {number} port - Server port number
 */

/**
 * JWT (JSON Web Token) configuration settings.
 *
 * @typedef {Object} JwtConfig
 * @property {string} secret - Secret key used to sign JWT tokens
 * @property {string} expiresIn - Token expiration time in format: number + unit (s, m, h, d)
 */

// Joi schema de validação das variáveis de ambiente
const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('test'),

  DB_DIALECT: Joi.string()
    .valid('sqlite', 'postgres', 'mysql', 'mariadb')
    .default('sqlite'),

  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  DB_HOST: Joi.alternatives().conditional('DB_DIALECT', {
    not: 'sqlite',
    then: Joi.string().required(),
    otherwise: Joi.string().default('./database.sqlite'),
  }),

  DB_TIMEZONE: Joi.alternatives().conditional('DB_DIALECT', {
    not: 'sqlite',
    then: Joi.string().required(),
    otherwise: Joi.string().default('-03:00'),
  }),

  PORT: Joi.number().port().default(3000),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string()
    .pattern(/^\d+[smhd]$/)
    .default('1h'),
}).unknown();

// Validação das variáveis
const { value: envVars, error } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  console.error(
    'Erro de configuração:\n',
    error.details.map((e) => e.message).join('\n'),
  );
  process.exit(1);
}

/**
 * Main configuration object containing all validated application settings.
 *
 * @type {Config}
 */
const config = {
  env: envVars.NODE_ENV,
  db: {
    name: envVars.DB_NAME,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    host: envVars.DB_HOST,
    dialect: envVars.DB_DIALECT,
    timezone: envVars.DB_TIMEZONE,
  },
  server: {
    port: envVars.PORT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
};

module.exports = { config };
