import toSentence from '../../toSentence/'
import getRawCardData from '../../getRawCardData/'

const getDragons = cards => cards.filter(card => card.race === 'dragon')

export default cards => {
  const dragonSynergists = ['N43', 'N51', 'F9', 'F19', 'S4']
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)
  const dragons = getDragons(cards)
  const hasDragonSynergist = hasAny(dragonSynergists)

  // If the deck has cards requiring dragons, but not enough dragons to properly
  // use combos, it is considered inefficient.
  if (!hasDragonSynergist || dragons.length >= 3) return null

  const consumerNames = toSentence(
    dragonSynergists
      .filter(hasCard)
      .map(getRawCardData)
      .map(card => card.name),
    'and'
  )

  return {
    id: 'INEFFICIENT_DRAGON_COMBOS',
    name: 'Inefficient Dragon Combos',
    description: `This deck includes ${consumerNames}, but doesn’t include enough dragons to provide good synergy. Consider including more dragons.`,
    highlight: [...dragons],
  }
}
