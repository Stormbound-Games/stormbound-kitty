export default (array, connector = 'or') => {
  if (array.length < 2) return array.join('')

  if (array.length === 2) return array.join(` ${connector} `)

  return `${array
    .slice(0, array.length - 1)
    .join(', ')}, ${connector} ${array.slice(-1)}`
}
