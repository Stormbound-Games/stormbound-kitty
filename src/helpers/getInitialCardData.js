import { deserialiseCard } from './deserialise'
import { serialiseCardFromCollection } from './serialise'
import getCardFromSlug from './getCardFromSlug'

export default card => {
  if (!card) {
    return {}
  }

  const isExistingCard = getCardFromSlug(card)

  if (isExistingCard) {
    return deserialiseCard(serialiseCardFromCollection(isExistingCard.id))
  }

  const decodedData = decodeURIComponent(card)

  return deserialiseCard(decodedData)
}
