const areAllValuesEqual = array =>
  array.length === 0 || array.every(item => item === array[0])

export default areAllValuesEqual
