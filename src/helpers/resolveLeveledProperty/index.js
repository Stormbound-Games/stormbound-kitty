import areAllValuesEqual from '~/helpers/areAllValuesEqual'

const resolveLeveledProperty = (value = '') => {
  // If the received input is already a resolved value, return it as is as there
  // is nothing else to do.
  if (value.values) return value

  const chunks = value.split('/')
  const values = Array.from(
    { length: 5 },
    (_, index) => chunks[index] || chunks[0] || null
  )
  // If all values are the same, visually shorten it for simplicity
  // Consider all values to be the same if there are 5 identical of them
  const allSame = chunks.length === 5 && areAllValuesEqual(chunks)
  const display = allSame ? chunks[0] : value

  return { values, display }
}

export default resolveLeveledProperty
