import getRawCardData from '../../../getRawCardData'
import toSentence from '../../../toSentence'

export const POISON_PROVIDERS = ['F2', 'F4', 'F5', 'F7', 'F13']

export default cards => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)

  // For Brood Sages to be considered efficient, it needs either poison cards
  // (Copperskin Ranger, Toxic Sacrifice, Crimson Sentry or Venomfall Spire) or
  // Heliotroopers which it can be paired nicely with.
  if (!hasCard('F1') || hasAny(POISON_PROVIDERS)) return null

  const cardNames = toSentence(
    POISON_PROVIDERS.map(getRawCardData).map(card => card.name),
    'and/or'
  )

  return {
    id: 'INEFFICIENT_BROOD_SAGES',
    name: 'Undervalued Brood Sages',
    description: `This deck includes Brood Sages but doesn’t include cards with poison capacity. Consider including ${cardNames}.`,
    highlight: ['F1'],
  }
}
