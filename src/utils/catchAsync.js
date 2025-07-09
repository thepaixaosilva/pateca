/**
 * Higher-order function that automates error handling in Express async functions.
 *
 * Wraps an async function in a wrapper that automatically catches any errors
 * that may occur during execution and passes them to Express error handling
 * middleware through the next() function. This eliminates the need for manual
 * try-catch blocks in each async controller.
 *
 * The wrapper uses Promise.resolve() to ensure that both synchronous and
 * asynchronous functions are handled correctly, capturing errors through the .catch() method.
 *
 * @param {Function} fn - Async controller function to be wrapped
 * @returns {Function} New function that accepts (req, res, next) and automatically handles errors
 *
 * @example
 * // Without catchAsync (manual approach):
 * const getUsers = async (req, res, next) => {
 *   try {
 *     const result = await userService.queryUsers();
 *     res.send(result);
 *   } catch (error) {
 *     next(error); // Must do this manually
 *   }
 * };
 *
 * // With catchAsync (simplified approach):
 * const getUsers = catchAsync(async (req, res) => {
 *   const result = await userService.queryUsers();
 *   res.send(result);
 *   // If there's an error, catchAsync automatically calls next(error)
 * });
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
