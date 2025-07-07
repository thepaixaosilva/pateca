const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const Logs = sequelize.define(
  'Logs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'logs',
    timestamps: true,
  },
);

module.exports = Logs;
