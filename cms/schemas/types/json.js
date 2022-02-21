const isJSON = value => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

const json = {
  type: 'string',
  validation: Rule =>
    Rule.custom(value =>
      value ? isJSON(value) || 'The value must be valid JSON.' : true
    ),
}

export default json
