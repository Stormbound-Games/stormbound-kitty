import { getEntry } from '~/helpers/sanity'
import serialization from '~/helpers/serialization'
import clean from './clean'

const getDeck = async ({ id, isPreview } = {}) => {
  const cards = serialization.deck.deserialize(id)
  const decks = [1, 2, 3, 4, 5].map(level =>
    serialization.deck.serialize(cards.map(card => ({ id: card.id, level })))
  )

  const deck = await getEntry({
    conditions: ['_type == "deck"', 'id in $decks'],
    params: { decks },
    options: { isPreview },
  })

  return deck ? clean(deck) : null
}

export default getDeck
