export default array =>
  array.length === 0 || array.every(item => item === array[0])
