const indexArray = (array, key = 'id') =>
  array.reduce((acc, entry) => ({ ...acc, [entry[key]]: entry }), {})

export default indexArray
