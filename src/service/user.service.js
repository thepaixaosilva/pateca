const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (user) => {
  const existingEmail = await User.findOne({ where: { email: user.email } });
  if (existingEmail) {
    throw new ApiError(httpStatus.status.CONFLICT, 'Email already taken');
  }

  const existingRa = await User.findOne({ where: { ra: user.ra } });
  if (existingRa) {
    throw new ApiError(httpStatus.status.CONFLICT, 'RA already taken');
  }

  return User.create(user);
};

const listUsers = async (filter, options) => {
  const { limit, offset } = options;
  const users = await User.findAndCountAll({
    where: filter,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const updateUserById = async (id, userBody) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found');
  }

  if (
    userBody.email &&
    (await User.findOne({
      where: { email: userBody.email, id: { [Op.ne]: id } },
    }))
  ) {
    throw new ApiError(httpStatus.status.CONFLICT, 'Email already taken');
  }

  if (
    userBody.ra &&
    (await User.findOne({ where: { ra: userBody.ra, id: { [Op.ne]: id } } }))
  ) {
    throw new ApiError(httpStatus.status.CONFLICT, 'RA already taken');
  }

  Object.assign(user, userBody);
  await user.save();
  return user;
};

const deleteUserById = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  listUsers,
  updateUserById,
  deleteUserById,
};
