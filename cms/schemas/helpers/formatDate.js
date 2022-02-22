const formatDate = date => {
  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
  const parts = formatter.formatToParts(new Date(date))
  const month = parts[0].value
  const year = parts[2].value

  return month + ' ' + year
}

export default formatDate
