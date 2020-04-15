import cards from '../data/cards'

/**
 * Return the amount of cards of the specified rarity, plus one for the fusion
 * stones slot which exists in every rarity.``
 * @param {String} rarity - One of the four rarities (uppercase)
 * @return {Number}
 */
const countCardsForRarity = rarity =>
  cards.filter(card => card.rarity === rarity).length + 1 /* Fusion Stones */

export default countCardsForRarity
