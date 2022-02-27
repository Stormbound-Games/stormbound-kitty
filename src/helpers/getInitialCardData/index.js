import serialization from '~/helpers/serialization'
import indexArray from '~/helpers/indexArray'

const getInitialCardData = (cards, card) => {
  const cardsIndex = indexArray(cards)

  if (!card) {
    return {}
  }

  if (card.toUpperCase() in cardsIndex) {
    // Go through the serialization on the official card data as it deals with
    // normalisation and resolution of properties like mana, strength and image.
    const resolvedCard = serialization.card.deserialize(
      cardsIndex,
      serialization.card.serialize(cardsIndex[card.toUpperCase()])
    )

    // Card serialization doesn’t define the `token` key, so it can be resolved
    // from the ID. Not amazing but it does the job.
    if (card.startsWith('T')) resolvedCard.token = true

    return resolvedCard
  }

  const decodedData = decodeURIComponent(card)

  return serialization.card.deserialize(cardsIndex, decodedData)
}

export default getInitialCardData
