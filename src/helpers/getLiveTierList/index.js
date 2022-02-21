import CARDS from '~/data/cards'
import serialization from '~/helpers/serialization'
import getFactionFromDeckID from '~/helpers/getFactionFromDeckID'
import { getLongFaction } from '~/helpers/encoding'
import getDecks from '~/api/decks/getDecks'

const getLiveTierList = async ({ isPreview } = {}) => {
  const decks = await getDecks({ isPreview })
  // Amount of decks of each type (computed in a single loop for performance)
  const COUNTS = {
    neutral: 0,
    winter: 0,
    swarm: 0,
    ironclad: 0,
    shadowfen: 0,
  }

  // Map of card IDs against amount of time they are found in a deck
  const found = {}

  // Array of tiers (at most)
  // 0 -> “0.9 – 1.0”, 1 -> “0.8 – 0.9”, 2 -> “0.7 – 0.8”…
  let tiers = Array.from({ length: 10 }, (_, index) => {
    const upper = 1 - index * 0.1
    const lower = Math.abs(upper - 0.1)

    return {
      name: lower.toFixed(1) + ' – ' + upper.toFixed(1),
      cards: [],
    }
  })

  // Go through each deck, and for each one increment the amount of decks of
  // this faction by 1 and go through the cards and mark them as found
  decks.forEach(({ id, tags }) => {
    // Do not take Brawl and Tournament decks into account as they would be
    // incorrectly skewing the popularity of cards
    if (tags.includes('BRAWL') || tags.includes('EQUALS')) return

    const deck = serialization.deck.deserialize(id)

    COUNTS[getFactionFromDeckID(id)]++
    COUNTS.neutral++

    deck.forEach(card => {
      found[card.id] = (found[card.id] || 0) + 1
    })
  })

  // Go through all cards that have been found, and insert them in a tier based
  // on the amount of time they were found compared to the amount of decks they
  // could have been found in
  Object.keys(found).forEach(card => {
    const faction = getLongFaction(card.slice(0, 1))
    const ratio = found[card] / COUNTS[faction]
    const tier = Math.max(
      tiers.length - Math.floor(ratio * tiers.length) - 1,
      0
    )

    tiers[tier].cards.push(card)
  })

  // Preserve only tiers that have at least a card
  tiers = tiers.filter(({ cards }) => cards.length > 0)

  // Add an extra tier at the end with all cards that have not been found in any deck
  const unusedCards = CARDS.filter(card => !found[card.id]).map(card => card.id)

  if (unusedCards.length > 0) {
    tiers.push({ name: 'Unused', cards: unusedCards })
  }

  // Finally serialize the list
  return serialization.list.serialize(tiers)
}

export default getLiveTierList
