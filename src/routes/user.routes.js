const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controller/user.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUserById)
  .patch(validate(userValidation.updateUser), userController.updateUserById)
  .delete(validate(userValidation.deleteUser), userController.deleteUserById);

module.exports = router;
