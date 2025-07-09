const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    ra: Joi.string()
      .pattern(/^\d{13}$/)
      .required(),
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    role: Joi.string().valid('student', 'coordinator', 'admin').required(),
    password: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    full_name: Joi.string(),
    email: Joi.string(),
    role: Joi.string().valid('student', 'coordinator', 'admin'),
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      ra: Joi.string().pattern(/^\d{13}$/),
      email: Joi.string().email(),
      full_name: Joi.string(),
      role: Joi.string().valid('student', 'coordinator', 'admin'),
      password: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
