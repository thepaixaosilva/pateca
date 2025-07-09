/**
 * Custom error class for API error handling. It extends the native Error class to add API-specific functionality such as
 * HTTP status codes and operational error classification.
 *
 * The class helps standardize error handling across the API, making it easier to send appropriate
 * HTTP responses and distinguish between operational errors (expected errors like validation failures)
 * and programming errors (unexpected bugs in the code).
 *
 * @class ApiError
 * @extends Error
 *
 * @example
 * // Validation error
 * throw new ApiError(400, 'Email is required');
 *
 * // Resource not found
 * throw new ApiError(404, 'User not found');
 *
 * // Authorization error
 * throw new ApiError(403, 'Access denied');
 *
 * // Internal server error (programming error)
 * throw new ApiError(500, 'Internal server error', false);
 */
class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   *
   * Calls the parent Error constructor with the provided message, then adds additional
   * properties specific to API error handling. The constructor automatically handles
   * stack trace capture, either using a provided stack trace or capturing the current
   * one while excluding the constructor itself from the trace.
   *
   * @param {number} statusCode - HTTP status code for the error (e.g., 400, 404, 500)
   * @param {string} message - Descriptive error message to be displayed or logged
   * @param {boolean} [isOperational=true] - Indicates if the error is operational (expected) or programming (unexpected)
   *   - true: Operational errors (validation, resource not found, authorization)
   *   - false: Programming errors (bugs, unexpected failures)
   * @param {string} [stack=''] - Optional custom stack trace. If not provided, captures current stack trace
   *
   * @example
   * // Basic usage with required parameters
   * const error = new ApiError(400, 'Invalid email format');
   *
   * // With operational flag set to false (programming error)
   * const error = new ApiError(500, 'Database connection failed', false);
   *
   * // With custom stack trace
   * const error = new ApiError(404, 'User not found', true, customStackTrace);
   *
   * @example
   * // Usage in Express middleware
   * const errorHandler = (err, req, res, next) => {
   *   if (err instanceof ApiError) {
   *     return res.status(err.statusCode).json({
   *       message: err.message,
   *       ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
   *     });
   *   }
   *
   *   // Handle unexpected errors
   *   res.status(500).json({ message: 'Internal server error' });
   * };
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
