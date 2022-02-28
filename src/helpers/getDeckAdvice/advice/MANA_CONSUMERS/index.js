import toSentence from '~/helpers/toSentence'

const MANA_CONSUMERS = ['W10', 'W21']
const MANA_PRODUCERS = ['W9', 'W19']

const advice = (cards, modifier, cardsIndex) => {
  const hasCard = id => cards.map(card => card.id).includes(id)
  const hasAny = ids => ids.some(hasCard)
  const hasAll = ids => ids.every(hasCard)
  const cardIds = cards.map(card => card.id)
  const hasManaConsumer = hasAny(MANA_CONSUMERS)
  const hasManaProducers = hasAll(MANA_PRODUCERS)

  // Lady Rime and Visions of the Grove require large amounts of mana to be efficient.
  // A deck including them and not Gift of the Wise and Frozen Core will diminish their impact.
  if (!hasManaConsumer || hasManaProducers) return null

  const consumerNames = toSentence(
    MANA_CONSUMERS.filter(hasCard)
      .map(id => cardsIndex[id])
      .map(card => card.name),
    'and'
  )

  const producerNames = toSentence(
    MANA_PRODUCERS.filter(id => !cardIds.includes(id))
      .map(id => cardsIndex[id])
      .map(card => card.name),
    'and'
  )

  return {
    name: `Inefficient ${consumerNames}`,
    description: `This deck includes ${consumerNames} but requires cards to produce more mana. Consider including ${producerNames} to get the most out of ${consumerNames}.`,
    highlight: MANA_CONSUMERS,
  }
}

export default advice
