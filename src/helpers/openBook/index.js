import rwc from 'random-weighted-choice'
import arrayRandom from '~/helpers/arrayRandom'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import isCardMatchingCriteria from '~/helpers/isCardMatchingCriteria'
import { getSequenceProbability } from '~/helpers/getDrawingProbability'
import getDrawingSequences from '~/helpers/getDrawingSequences'
import FUSION_STONES from '~/constants/fs'
import random from '~/helpers/random'
import indexArray from '~/helpers/indexArray'
import { RARITIES } from '~/constants/game'

const getRarityPool = (cards, rarity, only = {}) =>
  cards.filter(isCardMatchingCriteria({ ...only, rarity })).map(card => card.id)

const getDrawingPools = (cards, book) =>
  RARITIES.reduce(
    (acc, rarity) => ({
      ...acc,
      [rarity]: getRarityPool(cards, rarity, book.only),
    }),
    {}
  )

const getRandomCardId = pools => rarity => {
  const pool = pools[rarity]
  const draw = arrayRandom(pool)

  // Remove the card from the pool so it cannot be drawn again.
  pools[rarity] = pools[rarity].filter(id => id !== draw)

  return draw
}

const cache = new Map()

const getSequences = (cards, book) => {
  const key = `${book.draws}.${book.odds.join('')}`

  if (cache.has(key)) {
    return cache.get(key)
  }

  const getProbability = getSequenceProbability(cards, book, [1, 1, 1, 1])
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

const openBook = (cards, book) => {
  const cardsIndex = {
    ...indexArray(cards),
    ...FUSION_STONES.reduce((acc, fs) => ({ ...acc, [fs.id]: fs })),
  }
  const sequences = getSequences(cards, book)
  const sequence = getRandomSequence(sequences)
  const pools = getDrawingPools(cards, book)
  const draw = getRandomCardId(pools)
  const bookCards = sequence
    .map(rarityIndex => RARITIES[rarityIndex])
    .map(draw)
    .map(id => getResolvedCardData(cardsIndex, { id, level: 1 }))

  const withFusionStones = Math.random() <= 0.1

  // Confirmed in January 2022: there is roughly 10% chance of pulling Fusion
  // Stones from a book, regardless of its type (the difference should be
  // marginal enough for simulation purposes).
  // If the book does contain fusion Fusion Stones, a random card from the book
  // gets replaced with its Fusion Stones equivalent.
  if (withFusionStones) {
    const slotIndex = random(0, sequence.length - 1)
    const rarity = sequence[slotIndex]
    bookCards[slotIndex] = FUSION_STONES[rarity]
  }

  return bookCards
}

export default openBook
