import serialisation from '~/helpers/serialisation'

export default card => {
  if (!card) {
    return {}
  }

  const decodedData = decodeURIComponent(card)

  return serialisation.quest.deserialise(decodedData)
}
