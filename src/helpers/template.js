const TOKEN_REGEX = /({{([^}]+)}})/

/**
 * Replace replacement tokens from a string with given object of replacements
 * @param {String} string - String to replace
 * @param {Object} [ replacements = {} ] - Object of replacements
 * @returns {<String|React.Component>[]}
 */
const template = (string, replacements = {}) => {
  const match = string.match(TOKEN_REGEX)

  if (!match) {
    return [string]
  }

  const start = string.slice(0, match.index)
  const remains = string.slice(match.index + match[1].length)
  const end = template(remains, replacements)
  const replacement = replacements[match[2]]

  // Push everything until the first replacement token, then push the
  // replacement for the token, then treat the remaining part of the string
  // recursively as another template-able string. Finally, filter out any
  // possible empty strings.
  return [start, replacement, ...end].filter(v => Boolean(v) || v === 0)
}

export default template
