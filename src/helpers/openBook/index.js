import arrayRandom from '../../helpers/arrayRandom'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isCardMatchingCriteria from '../../helpers/isCardMatchingCriteria'
import { getSequenceProbability } from '../../helpers/getDrawingProbability'
import getDrawingSequences from '../../helpers/getDrawingSequences'
import cards from '../../data/cards'
import FUSION_STONES from '../../helpers/getRawCardData/fs'
import { RARITIES } from '../../constants/game'

const getRarityPool = (rarity, only = {}) =>
  cards
    .filter(isCardMatchingCriteria({ ...only, rarity }))
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

const openBook = (bookType, book) => {
  const canHappen = getSequenceProbability(bookType, [1, 1, 1, 1])
  const sequences = getDrawingSequences(book.draws).filter(canHappen)
  const sequence = arrayRandom(sequences)
  const pools = getDrawingPools(book)
  const draw = getRandomCardId(pools)

  return sequence
    .map(rarityIndex => Object.keys(RARITIES)[rarityIndex])
    .map(draw)
    .map(id => getResolvedCardData({ id, level: 1 }))
}

export default openBook
