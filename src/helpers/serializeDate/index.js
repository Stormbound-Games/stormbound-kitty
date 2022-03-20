// Given a date in format YYYY/MM/DD or YYYY-MM-DD (typically what comes out of
// Sanity), format it in the usual format for the site (MM/YYYY or DD/MM/YYYY).
const serializeDate = (date, short = true) => {
  const [year, month, day] = date.split(/[-/]/g)

  return short ? month + '/' + year : day + '/' + month + '/' + year
}

export default serializeDate
