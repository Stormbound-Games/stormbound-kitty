import unfoldValue from '~/helpers/unfoldValue'

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
const SLOTS = [null, null, null, null, null]

const resolveAbility = string => {
  if (!string) {
    return { values: SLOTS, display: null }
  }

  // If the received input is already a resolved ability, return it as is as
  // there is nothing else to do.
  if (string.values) {
    return string
  }

  const variables = string.match(VARIABLES_RE) || []
  const values = SLOTS.map((_, index) =>
    variables.reduce(
      (result, variable) =>
        result.replace(variable, unfoldValue(variable)[index]),
      string
    )
  )

  return { values, display: string }
}

export default resolveAbility
