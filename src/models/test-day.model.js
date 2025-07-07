const { DataTypes } = require('sequelize');
const sequelize = require('../config/database/database.config');

const TestDay = sequelize.define(
  'TestDay',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    test_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    test_type: {
      type: DataTypes.ENUM(
        '1° BIM. - SATURDAY',
        '2° BIM. - SATURDAY',
        '1° BIM. - MONDAY',
        '2° BIM. - MONDAY',
        'FINALS',
      ),
      allowNull: false,
    },
  },
  {
    tableName: 'test_days',
    timestamps: true,
  },
);

module.exports = TestDay;
