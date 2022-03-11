const read = (object, path = []) => {
  let value = object
  for (let i = 0; i < path.length; i++) value = value[path[i]]
  return value
}

const groupBy = (entries, key) =>
  entries.reduce((acc, entry) => {
    const value = read(entry, key.split('.'))
    if (!(value in acc)) acc[value] = []
    acc[value].push(entry)
    return acc
  }, {})

export default groupBy
