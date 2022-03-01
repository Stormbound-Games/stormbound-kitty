const serializeDate = (date, short = true) => {
  const [year, month, day] = date.split(/[-/]/g)

  return short ? month + '/' + year : day + '/' + month + '/' + year
}

export default serializeDate
