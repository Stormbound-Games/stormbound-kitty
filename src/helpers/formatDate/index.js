export const formatPreciseDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const day = parts[2].value
  const year = parts[4].value

  return month + ' ' + day + ', ' + year
}

export const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const year = parts[2].value

  return month + ' ' + year
}
