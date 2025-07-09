const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const userService = require('../service/user.service');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.status.CREATED).send(user);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['full_name', 'email', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.listUsers(filter, options);
  res.send(result);
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUserById = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.status.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
};
