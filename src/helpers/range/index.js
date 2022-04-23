// Return an array of numbers spreading from min to max (both included).
// @param {Number} min - Lower bound (included)
// @param {Number} max - Upper bound (included)
// @return {Number[]}
const range = (min, max = min) =>
  [...Array(max + 1 - min).keys()].map(n => n + min)

export default range
