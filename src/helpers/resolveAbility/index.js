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

  const variables = string.match(VARIABLES_RE)
  const values = SLOTS.map((slot, index) => {
    if (!variables) return string

    let result = string

    variables.forEach(variable => {
      const chunks = variable.split('/')
      result = result.replace(variable, chunks[index])
    })

    return result
  })

  return { values, display: string }
}

export default resolveAbility
