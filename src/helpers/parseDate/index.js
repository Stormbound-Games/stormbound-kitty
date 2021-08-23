const parseDate = date => {
  if (date instanceof Date) return date

  const chunks = date.split('/')

  if (chunks.length === 2) {
    // Halfway through the month as 1st of the month can lead to off-by-one
    // errors depending on timezones
    return new Date(+chunks[1], +chunks[0] - 1, 15)
  }

  return new Date(+chunks[2], +chunks[1] - 1, +chunks[0])
}

export default parseDate
