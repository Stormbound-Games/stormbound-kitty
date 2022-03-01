import { getEntry } from '~/helpers/sanity'
import serialization from '~/helpers/serialization'
import indexArray from '~/helpers/indexArray'
import getCards from '~/api/cards/getCards'
import { FIELDS, MAPPER } from './utils'

const getDeck = async ({ id, isPreview } = {}) => {
  const cards = await getCards({ isPreview })
  const cardsIndexBySid = indexArray(cards, 'sid')
  const deckCards = serialization.deck.deserialize(cardsIndexBySid, id)
  const decks = [1, 2, 3, 4, 5].map(level =>
    serialization.deck.serialize(
      deckCards.map(card => ({ id: card.id, level }))
    )
  )

  const deck = await getEntry({
    conditions: ['_type == "deck"', 'id in $decks'],
    fields: FIELDS,
    params: { decks },
    options: { isPreview },
  })

  return deck ? MAPPER(deck) : null
}

export default getDeck
