import unfoldValue from '#helpers/unfoldValue'

// Not a star, space or forward slash
// Followed by a slash
// Followed by not a slash (possibly empty)
// Followed by a slash
// Followed by not a slash (possibly empty)
// Followed by a slash
// Followed by not a slash (possibly empty)
// Followed by a slash
// Followed by not a star, space or comma (possibly empty), or the end of input
const VARIABLES_RE = /([^*\s/]*)\/([^/]*)\/([^/]*)\/([^/]*)\/([^*\s,]*|$)/g

const resolveAbility = string => {
  if (!string) {
    return { values: [null, null, null, null, null], display: null }
  }

  // If the received input is already a resolved ability, return it as is as
  // there is nothing else to do.
  if (string.values) {
    return string
  }

  const variables = string.match(VARIABLES_RE) || []
  // A little odd, but this doesn’t resolve the first variable, then the second,
  // and so on. This resolves the first level of all variables, then the second
  // level of all variables, etc.
  const values = Array.from({ length: 5 }, (_, index) =>
    variables.reduce((result, variable) => {
      const chunks = unfoldValue(variable)
      let value = chunks[index]

      // If the value is a literal `~`, copy the value of the previous slot (or
      // any first slot before that that’s not a literal `~`).
      if (value === '~') {
        let i = index
        while (i--) {
          value = chunks[i]
          if (value !== '~') break
        }
      }

      return result.replace(variable, value)
    }, string)
  )

  // `values` is an array of 5 resolved abilities, 1 per level.
  // `display` is a string showing scaling with `/` separated values.
  return { values, display: string }
}

export default resolveAbility
