/**
 * Pad given array up to a certain length with a certain padding value
 * @param {Array} array - Array to pad
 * @param {Number} length - Desired array length
 * @param {*} padding - Padding value
 * @return Array of expected length
 */
const arrayPad = (array, length, padding) => {
  while (array.length < length) {
    array.unshift(padding)
  }

  return array
}

export default arrayPad
