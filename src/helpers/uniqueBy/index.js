const uniqueBy = (array, key = 'id') => {
  const result = []
  const set = new Set()

  for (const item of array) {
    if (!set.has(item[key])) {
      set.add(item[key])
      result.push(item)
    }
  }

  return result
}

export default uniqueBy
