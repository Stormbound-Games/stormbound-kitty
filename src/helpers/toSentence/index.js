const toSentence = (array, connector = '') => {
  if (array.length < 2) return array.join('')

  return [
    array.slice(0, array.length - 1).join(', ') + (array.length > 2 ? ',' : ''),
    connector,
    array.slice(-1),
  ]
    .filter(Boolean)
    .join(' ')
}

export default toSentence
