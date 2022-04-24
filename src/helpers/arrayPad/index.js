// Pad given array up to a certain length with a certain padding value
// @param {Array} array - Array to pad
// @param {Number} length - Desired array length
// @param {*} padding - Padding value
// @return Array of expected length
const arrayPad = (array, length, padding, direction = -1) => {
  while (array.length < length) {
    if (direction === -1) array.unshift(padding)
    else array.push(padding)
  }

  return array
}

export default arrayPad
