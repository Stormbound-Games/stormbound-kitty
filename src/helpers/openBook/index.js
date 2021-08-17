import rwc from 'random-weighted-choice'
import arrayRandom from '~/helpers/arrayRandom'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardMatchingCriteria from '~/helpers/isCardMatchingCriteria'
import { getSequenceProbability } from '~/helpers/getDrawingProbability'
import getDrawingSequences from '~/helpers/getDrawingSequences'
import CARDS from '~/data/cards'
import FUSION_STONES from '~/helpers/getRawCardData/fs'
import { RARITIES } from '~/constants/game'

const getRarityPool = (rarity, only = {}) =>
  CARDS.filter(isCardMatchingCriteria({ ...only, rarity }))
    .map(card => card.id)
    .concat(FUSION_STONES.find(fs => fs.rarity === rarity).id)

const getDrawingPools = book =>
  Object.keys(RARITIES).reduce(
    (acc, rarity) => ({ ...acc, [rarity]: getRarityPool(rarity, book.only) }),
    {}
  )

const getRandomCardId = pools => rarity => {
  const pool = pools[rarity]
  const draw = arrayRandom(pool)

  // When drawing Fusion Stones, remove the possibility to draw further Fusion
  // Stones (of any rarity) as there is a limit of one Fusion Stones’ draw per
  // book.
  if (draw.startsWith('R')) {
    Object.keys(pools).forEach(rarity => {
      pools[rarity] = pools[rarity].filter(id => !id.startsWith('R'))
    })
  } else {
    // Remove the card from the pool so it cannot be drawn again.
    pools[rarity] = pools[rarity].filter(id => id !== draw)
  }

  return draw
}

const cache = new Map()

const getSequences = book => {
  const key = `${book.draws}.${book.percentiles.join('')}`

  if (cache.has(key)) {
    return cache.get(key)
  }

  const getProbability = getSequenceProbability(book, [1, 1, 1, 1])
  const sequences = getDrawingSequences(book.draws)
    .map(sequence => ({
      id: sequence.join(','),
      // I am not sure this is the best way to go. The random library wants the
      // weights to be integers, but the `getSequenceProbability` function
      // returns a float between 0 and 1.
      weight: Math.round(1_000_000_000 * getProbability(sequence)),
    }))
    // Remove the sequences which cannot happen in that particular book.
    .filter(entry => entry.weight > 0)

  cache.set(key, sequences)

  return sequences
}

const getRandomSequence = sequences => rwc(sequences).split(',').map(Number)

const openBook = book => {
  const sequences = getSequences(book)
  const sequence = getRandomSequence(sequences)
  const pools = getDrawingPools(book)
  const draw = getRandomCardId(pools)

  return sequence
    .map(rarityIndex => Object.keys(RARITIES)[rarityIndex])
    .map(draw)
    .map(id => getResolvedCardData({ id, level: 1 }))
}

export default openBook
