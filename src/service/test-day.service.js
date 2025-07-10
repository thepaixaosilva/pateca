const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { TestDay } = require('../models');
const ApiError = require('../utils/ApiError');

const createTestDay = async (testDay) => {
  if (
    await TestDay.findOne({
      where: { test_date: testDay.test_date, test_type: testDay.test_type },
    })
  ) {
    throw new ApiError(
      httpStatus.status.BAD_REQUEST,
      'Test day already exists for this date and type',
    );
  }
  return TestDay.create(testDay);
};

const listTestDays = async (filter, options) => {
  const { limit, offset } = options;
  const testDays = await TestDay.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  return testDays;
};

const getTestDayById = async (id) => {
  const testDay = await TestDay.findByPk(id);
  return testDay;
};

const updateTestDayById = async (id, testDayBody) => {
  const testDay = await getTestDayById(id);

  if (!testDay) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Test day not found');
  }

  if (
    testDayBody.test_date &&
    testDayBody.test_type &&
    (await TestDay.findOne({
      where: {
        test_date: testDay.test_date,
        test_type: testDay.test_type,
        id: { [Op.ne]: id },
      },
    }))
  ) {
    throw new ApiError(
      httpStatus.status.BAD_REQUEST,
      'Test day already exists for this date and type',
    );
  }
  Object.assign(testDay, testDayBody);
  await testDay.save();
  return testDay;
};

const deleteTestDayById = async (id) => {
  const testDay = await getTestDayById(id);
  if (!testDay) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Test day not found');
  }
  await testDay.destroy();
  return testDay;
};

module.exports = {
  createTestDay,
  getTestDayById,
  listTestDays,
  updateTestDayById,
  deleteTestDayById,
};
