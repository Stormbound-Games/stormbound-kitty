const clean = change => {
  const [year, month, day] = change.date.split(/[-/]/g)

  change.id = change.card?.id ?? change.id
  change.timestamp = new Date(change.date).valueOf()
  change.date = day + '/' + month + '/' + year
  change.from = change.from
    ? change.from.reduce((acc, entry) => {
        acc[entry.stat] = entry.value
        return acc
      }, {})
    : null

  delete change._createdAt
  delete change._updatedAt
  delete change._id
  delete change._rev
  delete change._type

  return change
}

export default clean
