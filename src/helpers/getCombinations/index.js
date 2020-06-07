const getCombinations = (array, size) => {
  function push(t, index) {
    if (t.length === size) return result.push(t)
    if (index + 1 > array.length) return

    push(t.concat(array[index]), index + 1)
    push(t, index + 1)
  }

  const result = []

  push([], 0)

  return result
}

export default getCombinations
