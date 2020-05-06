import cards from '../../data/cards'

const counts = cards.reduce((counts, card) => {
  counts[card.rarity] = (counts[card.rarity] || 0) + 1
  return counts
}, {})

/**
 * Return the amount of cards of the specified rarity, plus one for the fusion
 * stones slot which exists in every rarity.``
 * @param {String} rarity - One of the four rarities (uppercase)
 * @return {Number}
 */
const countCardsForRarity = rarity => counts[rarity] + 1 /* Fusion Stones */

export default countCardsForRarity
