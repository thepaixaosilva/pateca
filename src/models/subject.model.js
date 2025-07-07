const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const Subject = sequelize.define(
  'Subject',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'subjects',
    timestamps: true,
  },
);

module.exports = Subject;
