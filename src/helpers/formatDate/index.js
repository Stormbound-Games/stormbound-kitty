import getOrdinalSuffix from '~/helpers/getOrdinalSuffix'

export const formatPreciseDate = date => {
  if (!date) return null
  if (!(date instanceof Date)) date = new Date(date)

  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const day = getOrdinalSuffix(+parts[2].value)
  const year = parts[4].value

  return month + ' ' + day + ', ' + year
}

export const formatDate = date => {
  if (!date) return null
  if (!(date instanceof Date)) date = new Date(date)

  const formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
  const parts = formatter.formatToParts(date)
  const month = parts[0].value
  const year = parts[2].value

  return month + ' ' + year
}
