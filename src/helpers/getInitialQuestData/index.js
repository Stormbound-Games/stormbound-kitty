import serialisation from '../serialisation'

export default card => {
  if (!card) {
    return {}
  }

  const decodedData = decodeURIComponent(card)

  return serialisation.quest.deserialise(decodedData)
}
