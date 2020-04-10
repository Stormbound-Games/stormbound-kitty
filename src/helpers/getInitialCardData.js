import { deserialiseCard } from './deserialise'
import { serialiseCardFromCollection } from './serialise'
import cards from '../data/cards'

const getCardFromSlug = slug =>
  cards.find(
    card => slugify(card.name) === slug.toLowerCase() || card.id === slug
  )

const slugify = name =>
  name.replace(/\s/g, '_').replace(/’',/g, '').toLowerCase()

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
