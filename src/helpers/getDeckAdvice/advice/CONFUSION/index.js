const hasAny = (cards, ids) =>
  ids.some(id => cards.map(card => card.id).includes(id))

const advice = cards => {
  const hasConfusionProvider = hasAny(cards, ['N62', 'N60'])
  const hasConfusionConsumer = hasAny(cards, ['N61', 'N64'])

  // If the deck has cards requiring confusion (consumers), but no cards
  // confusing enemies (providers), it is considered inefficient. If it does not
  // have cards requiring confusion however, the advice can be skipped.
  if (!hasConfusionConsumer || hasConfusionProvider) return null

  return {
    name: 'Inefficient confusion combos',
    description:
      'This deck includes cards needing confusion effects but doesn’t include cards which confuse enemy units. Consider including Fluffy Badboxers or Sweetcap Kittens.',
    highlight: ['N61', 'N64'],
  }
}

export default advice
