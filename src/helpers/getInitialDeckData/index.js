import serialisation from '~/helpers/serialisation'

const getInitialDeckData = deck => {
  if (!deck) {
    return []
  }

  const decodedData = decodeURIComponent(deck)

  return serialisation.deck.deserialise(decodedData)
}

export default getInitialDeckData
