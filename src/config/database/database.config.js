const { Sequelize } = require('sequelize');
const { config } = require('../environment.config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    ...(config.db.dialect !== 'sqlite' ? { timezone: config.db.timezone } : {}),
  },
);

module.exports = sequelize;
