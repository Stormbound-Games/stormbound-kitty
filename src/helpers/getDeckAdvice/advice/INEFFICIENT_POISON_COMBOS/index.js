import getRawCardData from '../../../getRawCardData'
import toSentence from '../../../toSentence'

const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

export const POISON_PROVIDERS = ['F2', 'F4', 'F5', 'F13']
export const POISON_CONSUMERS = ['F11', 'F15']

export default cards => {
  const hasPoisonProvider = hasAny(cards, POISON_PROVIDERS)
  const hasPoisonConsumer = hasAny(cards, POISON_CONSUMERS)

  // If the deck has cards requiring poison (consumers), but no cards
  // poisoning enemies (providers), it is considered inefficient. If it does not
  // have cards requiring poison however, the advice can be skipped.
  if (!hasPoisonConsumer || hasPoisonProvider) return null

  const cardNames = toSentence(
    POISON_PROVIDERS.map(getRawCardData).map(card => card.name),
    'and/or'
  )

  return {
    id: 'INEFFICIENT_POISON_COMBOS',
    name: 'Inefficient poison combos',
    description: `This deck includes cards needing poison effects but doesn’t include cards with poison capacity. Consider including ${cardNames}.`,
    highlight: ['F11', 'F15'],
  }
}
