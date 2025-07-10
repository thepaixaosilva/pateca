const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const testDayService = require('../service/test-day.service');

const createTestDay = catchAsync(async (req, res) => {
  const testDay = await testDayService.createTestDay(req.body);
  res.status(httpStatus.status.CREATED).send(testDay);
});

const getTestDayById = catchAsync(async (req, res) => {
  const testDay = await testDayService.getTestDayById(req.params.testDayId);
  if (!testDay) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Test day not found');
  }
  res.send(testDay);
});

const getTestDays = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['test_date', 'test_type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await testDayService.listTestDays(filter, options);
  res.send(result);
});

const updateTestDayById = catchAsync(async (req, res) => {
  const testDay = await testDayService.updateTestDayById(
    req.params.testDayId,
    req.body,
  );
  res.send(testDay);
});

const deleteTestDayById = catchAsync(async (req, res) => {
  await testDayService.deleteTestDayById(req.params.testDayId);
  res.status(httpStatus.status.NO_CONTENT).send();
});

module.exports = {
  createTestDay,
  getTestDayById,
  getTestDays,
  updateTestDayById,
  deleteTestDayById,
};
