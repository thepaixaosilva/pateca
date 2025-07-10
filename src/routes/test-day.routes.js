const express = require('express');
const validate = require('../middlewares/validate');
const testDayValidation = require('../validations/test-day.validation');
const testDayController = require('../controller/test-day.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(testDayValidation.createTestDay),
    testDayController.createTestDay,
  )
  .get(validate(testDayValidation.getTestDays), testDayController.getTestDays);

router
  .route('/:testDayId')
  .get(validate(testDayValidation.getTestDay), testDayController.getTestDayById)
  .patch(
    validate(testDayValidation.updateTestDay),
    testDayController.updateTestDayById,
  )
  .delete(
    validate(testDayValidation.deleteTestDay),
    testDayController.deleteTestDayById,
  );

module.exports = router;
