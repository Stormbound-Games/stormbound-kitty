import serialization from '~/helpers/serialization'

const getInitialDeckData = deck => {
  if (!deck) {
    return []
  }

  const decodedData = decodeURIComponent(deck)

  return serialization.deck.deserialize(decodedData)
}

export default getInitialDeckData
