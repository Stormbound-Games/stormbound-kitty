import toSentence from '~/helpers/toSentence'

const getDragons = cards =>
  cards.filter(card => card.unitTypes.includes('dragon'))
export const DRAGON_CONSUMERS = ['N6', 'N43', 'N51', 'F9', 'F19', 'S4']

const advice = (cards, modifier, cardsIndex) => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)
  const dragons = getDragons(cards)
  const hasDragonSynergist = hasAny(DRAGON_CONSUMERS)

  // If the deck has cards requiring dragons, but not enough dragons to properly
  // use combos, it is considered inefficient.
  if (!hasDragonSynergist || dragons.length >= 3) return null

  const consumerNames = toSentence(
    DRAGON_CONSUMERS.filter(hasCard)
      .map(id => cardsIndex[id])
      .map(card => card.name),
    'and'
  )

  return {
    name: 'Inefficient dragon Combos',
    description: `This deck includes ${consumerNames}, but doesn’t include enough dragons to provide good synergy. Consider including more dragons.`,
    highlight: dragons,
  }
}

export default advice
