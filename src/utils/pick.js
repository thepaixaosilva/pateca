/**
 * Extracts specific properties from an object, creating a new object with only the desired keys.
 *
 * Uses the reduce method to iterate over the provided keys, checking if each one exists
 * in the source object using hasOwnProperty. If the property exists, it is added to the new object.
 * This function is useful for filtering query string parameters, keeping only relevant fields
 * and ignoring invalid or unwanted properties.
 *
 * @param {Object} object - The source object from which to extract properties
 * @param {string[]} keys - Array of strings containing the names of desired properties
 * @returns {Object} New object containing only the specified properties that exist in the source object
 *
 * @example
 * const reqQuery = { name: 'John', role: 'admin', age: 30, city: 'New York' };
 * const filter = pick(reqQuery, ['name', 'role']);
 * // Result: { name: 'John', role: 'admin' }
 *
 * const options = pick(reqQuery, ['sortBy', 'limit', 'page']);
 * // Result: {} (properties don't exist in the original object)
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = pick;
