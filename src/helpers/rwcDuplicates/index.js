import rwc from 'random-weighted-choice'

// Randomly choose a card from the cards array, based on the weights, when cards are
// uniquely identified by an id and an idx property
// Note: Use only when the cards contain an idx property
// @param {Object[]} cards - Cards to choose from
// @return {Object} Chosen card
const rwcDuplicates = cards => {
  if (!cards.every(card => card.hasOwnProperty('idx'))) {
    const pickId = rwc(cards)

    return cards.find(card => card.id === pickId)
  }

  const mergeIds = (id, idx) => id + '_' + idx
  const mergeCardIds = card => ({ ...card, id: mergeIds(card.id, card.idx) })
  const extractIds = longId => longId.split('_')
  const extractCardIds = card => {
    const [id, idx] = extractIds(card.id)
    return { ...card, id, idx }
  }

  const longIdCards = cards.map(mergeCardIds)
  const pickId = rwc(longIdCards)
  const pick = longIdCards.find(card => card.id === pickId)

  return extractCardIds(pick)
}

export default rwcDuplicates
