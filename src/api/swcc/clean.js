const clean = season => {
  return season.weeks.map(week => {
    const [year, month, day] = week.date.split(/[-/]/g)
    week.date = day + '/' + month + '/' + year
    week.season = season.number

    delete week._type
    delete week._key

    return week
  })
}

export default clean
