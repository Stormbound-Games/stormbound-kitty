const VARIABLES_RE = /([^*\s/]*)\/([^/]*)\/([^/]*)\/([^/]*)\/([^*\s]*|$)/g
const SLOTS = [null, null, null, null, null]

export default string => {
  if (string === null) {
    return { values: SLOTS, display: null }
  }

  const decoded = decodeURIComponent(string)
  const variables = decoded.match(VARIABLES_RE)
  const values = SLOTS.map((slot, index) => {
    if (!variables) {
      return decoded
    }

    let result = decoded

    variables.forEach(variable => {
      const chunks = variable.split('/')
      result = result.replace(variable, chunks[index])
    })

    return result
  })

  return { values, display: decoded }
}
