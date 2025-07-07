const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const AnswerKey = sequelize.define(
  'AnswerKey',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer_1: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    answer_2: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    answer_3: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    answer_4: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    answer_5: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    fk_test_day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'test_days',
        key: 'id',
      },
    },
    fk_subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
  },
  {
    tableName: 'answer_keys',
    timestamps: true,
  },
);

module.exports = AnswerKey;
