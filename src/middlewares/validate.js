const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

/**
 * Express middleware factory for request validation using Joi schemas.
 *
 * This middleware validates incoming HTTP requests against Joi schemas for params,
 * query strings, and request bodies. It provides comprehensive validation with
 * detailed error messages and automatically transforms/sanitizes validated data.
 *
 * The middleware follows a fail-fast approach for invalid requests, returning
 * a 400 Bad Request response with detailed error messages when validation fails.
 * On successful validation, it replaces the original request data with the
 * validated/transformed data from Joi.
 *
 * @param {Object} schema - Joi validation schema object
 * @param {Joi.ObjectSchema} [schema.params] - Joi schema for URL parameters
 * @param {Joi.ObjectSchema} [schema.query] - Joi schema for query string parameters
 * @param {Joi.ObjectSchema} [schema.body] - Joi schema for request body
 * @returns {Function} Express middleware function (req, res, next)
 *
 * @example
 * // Define validation schema
 * const userSchema = {
 *   body: Joi.object({
 *     name: Joi.string().required(),
 *     email: Joi.string().email().required(),
 *     age: Joi.number().min(18).max(120)
 *   }),
 *   query: Joi.object({
 *     page: Joi.number().default(1),
 *     limit: Joi.number().default(10)
 *   })
 * };
 *
 * // Use in route
 * app.post('/users', validate(userSchema), createUser);
 *
 * @example
 * // Parameter validation
 * const getUserSchema = {
 *   params: Joi.object({
 *     id: Joi.string().uuid().required()
 *   })
 * };
 *
 * app.get('/users/:id', validate(getUserSchema), getUser);
 *
 * @example
 * // Query string validation
 * const searchSchema = {
 *   query: Joi.object({
 *     q: Joi.string().required(),
 *     category: Joi.string().valid('user', 'product', 'order'),
 *     sortBy: Joi.string().valid('name', 'date', 'relevance').default('relevance')
 *   })
 * };
 *
 * app.get('/search', validate(searchSchema), search);
 *
 * @throws {ApiError} Returns 400 Bad Request if validation fails
 *
 * @see {@link https://joi.dev/api/} Joi API Documentation
 */
const validate = (schema) => (req, res, next) => {
  /**
   * Extract only the validation schemas that are relevant for this middleware.
   * Filters the schema object to include only 'params', 'query', and 'body' properties.
   */
  const validSchema = pick(schema, ['params', 'query', 'body']);

  /**
   * Extract the corresponding data from the request object.
   * Only picks the properties that have corresponding validation schemas.
   */
  const object = pick(req, Object.keys(validSchema));

  /**
   * Compile and validate the request data against the schema.
   *
   * Configuration options:
   * - errors.label: 'key' - Use property names in error messages instead of labels
   * - abortEarly: false - Collect all validation errors, don't stop at first error
   */
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  /**
   * Handle validation errors by creating a comprehensive error message.
   * Combines all validation error messages into a single string.
   */
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(httpStatus.status.BAD_REQUEST, errorMessage));
  }

  /**
   * Replace original request data with validated/transformed data.
   * This ensures that the route handlers receive clean, validated data
   * with any transformations (defaults, conversions) applied by Joi.
   */
  Object.assign(req, value);

  /**
   * Continue to the next middleware/route handler.
   */
  return next();
};

/**
 * @module ValidationMiddleware
 * @exports {Function} validate - Request validation middleware factory
 */
module.exports = validate;
