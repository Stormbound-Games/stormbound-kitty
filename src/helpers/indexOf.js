// Variant of `String.prototype.indexOf` that can handle a regular expression
// instead of a static string.
// @param {String} string - String to inspect (haystack)
// @param {RegExp} regex - Regular expression (needle)
// @param {Number} startPosition - Earliest lookup position
// @return {Number | null}
const indexOf = (string, regex, startPosition = 0) => {
  const indexOf = string.substring(startPosition).search(regex)

  return indexOf >= 0 ? indexOf + startPosition : undefined
}

export default indexOf
