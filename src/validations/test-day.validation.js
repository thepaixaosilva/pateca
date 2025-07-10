const Joi = require('joi');

const createTestDay = {
  body: Joi.object().keys({
    test_date: Joi.date().required(),
    test_type: Joi.string()
      .valid(
        '1° BIM. - SATURDAY',
        '2° BIM. - SATURDAY',
        '1° BIM. - MONDAY',
        '2° BIM. - MONDAY',
        'FINALS',
      )
      .required(),
  }),
};

const getTestDays = {
  query: Joi.object().keys({
    test_date: Joi.date().required(),
    test_type: Joi.string().valid(
      '1° BIM. - SATURDAY',
      '2° BIM. - SATURDAY',
      '1° BIM. - MONDAY',
      '2° BIM. - MONDAY',
      'FINALS',
    ),
    sortBy: Joi.string(),
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
  }),
};

const getTestDay = {
  params: Joi.object().keys({
    testDayId: Joi.number().integer().required(),
  }),
};

const updateTestDay = {
  params: Joi.object().keys({
    testDayId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      test_date: Joi.date(),
      test_type: Joi.string().valid(
        '1° BIM. - SATURDAY',
        '2° BIM. - SATURDAY',
        '1° BIM. - MONDAY',
        '2° BIM. - MONDAY',
        'FINALS',
      ),
    })
    .min(1),
};

const deleteTestDay = {
  params: Joi.object().keys({
    testDayId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTestDay,
  getTestDays,
  getTestDay,
  updateTestDay,
  deleteTestDay,
};
