import capitalise from '~/helpers/capitalise'

const getAverageManaCost = cards =>
  cards.map(card => card.mana).reduce((a, b) => a + b, 0) / cards.length

const LOWER_THRESHOLD = 2.8
const UPPER_THRESHOLD = 5.5

const advice = (cards, modifier = '') => {
  const averageManaCost = getAverageManaCost(cards)

  // `2.8` is an arbitrary threshold. This check really is only there to mark
  // unusually cheap decks (which are not the cause of a mana-Brawl modifier).
  // This is not a fantastic advice though, because the current meta highly
  // favour cheap decks over expensive ones. But extremely cheap decks might
  // suffer if they don’t finish the game early, so it’s worth an advice still.
  if (modifier.includes('MANA') && averageManaCost < LOWER_THRESHOLD)
    return null
  if (averageManaCost >= LOWER_THRESHOLD && averageManaCost <= UPPER_THRESHOLD)
    return null

  const name = averageManaCost > UPPER_THRESHOLD ? 'heavy' : 'light'
  const adjective = averageManaCost > UPPER_THRESHOLD ? 'high' : 'low'
  const opposite = averageManaCost > UPPER_THRESHOLD ? 'cheap' : 'expensive'
  const duration = averageManaCost > UPPER_THRESHOLD ? 'short' : 'long'

  return {
    name: capitalise(name) + ' deck',
    description: `This deck has an average mana cost of ${averageManaCost.toFixed(
      2
    )}, which might be a little ${adjective}. Consider including one or two more ${opposite} cards to be able to power through ${duration} games.`,
    highlight: cards.filter(card => card.mana < averageManaCost),
  }
}

export default advice
