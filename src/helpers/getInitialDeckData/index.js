import serialization from '~/helpers/serialization'

const getInitialDeckData = (cardsIndexBySid, deck) => {
  if (!deck) {
    return []
  }

  const decodedData = decodeURIComponent(deck)

  return serialization.deck.deserialize(cardsIndexBySid, decodedData)
}

export default getInitialDeckData
