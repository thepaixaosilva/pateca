const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const StudentAnswers = sequelize.define(
  'StudentAnswers',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_answer_key_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answer_keys',
        key: 'id',
      },
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  },
  {
    tableName: 'student_answers',
    timestamps: true,
  },
);

module.exports = StudentAnswers;
