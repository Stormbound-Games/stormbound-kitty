import serialisation from '~/helpers/serialisation'

export default deck => {
  if (!deck) {
    return []
  }

  const decodedData = decodeURIComponent(deck)

  return serialisation.deck.deserialise(decodedData)
}
