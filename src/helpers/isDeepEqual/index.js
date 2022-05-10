// Return whether x and y are deeply equal to one another.
// From: https://stackoverflow.com/a/25456134
// @param {Object} x
// @param {Object} y
// @return {Boolean}
const isDeepEqual = (x, y) => {
  if (x === y) return true

  if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
    if (Object.keys(x).length != Object.keys(y).length) return false

    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!isDeepEqual(x[prop], y[prop])) return false
      } else return false
    }

    return true
  }

  return false
}

export default isDeepEqual
