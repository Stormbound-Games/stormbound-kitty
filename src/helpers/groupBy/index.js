const groupBy = (entries, key) =>
  entries.reduce((acc, entry) => {
    if (!(entry[key] in acc)) acc[entry[key]] = []
    acc[entry[key]].push(entry)
    return acc
  }, {})

export default groupBy
