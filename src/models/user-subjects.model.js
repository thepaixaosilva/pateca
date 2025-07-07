const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const UserSubjects = sequelize.define(
  'UserSubjects',
  {
    fk_subject_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'subjects',
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
  },
  {
    tableName: 'user_subjects',
    timestamps: true,
  },
);

module.exports = UserSubjects;
