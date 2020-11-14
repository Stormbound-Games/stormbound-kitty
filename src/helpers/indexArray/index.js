export default (array, key = 'id') =>
  array.reduce((acc, entry) => ({ ...acc, [entry[key]]: entry }), {})
