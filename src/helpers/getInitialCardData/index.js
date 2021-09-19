import serialization from '~/helpers/serialization'
import getCardFromSlug from '~/helpers/getCardFromSlug'
import getRawCardData from '~/helpers/getRawCardData'

const getInitialCardData = card => {
  if (!card) {
    return {}
  }

  const officialCard = getCardFromSlug(card)

  if (officialCard) {
    // Go through the serialization on the official card data as it deals with
    // normalisation and resolution of properties like mana, strength and image.
    const resolvedCard = serialization.card.deserialize(
      serialization.card.serialize(getRawCardData(officialCard.id))
    )

    // Card serialization doesn’t define the `token` key, so it can be resolved
    // from the ID. Not amazing but it does the job.
    if (card.startsWith('T')) resolvedCard.token = true

    return resolvedCard
  }

  const decodedData = decodeURIComponent(card)

  return serialization.card.deserialize(decodedData)
}

export default getInitialCardData
