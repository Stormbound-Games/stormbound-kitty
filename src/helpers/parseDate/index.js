const parseDate = date => {
  if (date instanceof Date) return date

  const chunks = date.split('/')

  if (chunks.length === 2) {
    return new Date(+chunks[1], +chunks[0] - 1, 1)
  }

  return new Date(+chunks[2], +chunks[1] - 1, +chunks[0])
}

export default parseDate
