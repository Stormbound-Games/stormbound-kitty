const toArray = value => {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'undefined') {
    return []
  }

  return [value]
}

export default toArray
