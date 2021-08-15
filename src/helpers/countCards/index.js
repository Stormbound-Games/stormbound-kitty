import isCardMatchingCriteria from '../isCardMatchingCriteria'
import CARDS from '../../data/cards'

const cache = new Map()

const countCards = (criteria, countFusionStones = true) => {
  const key = Object.values(criteria).sort().concat(countFusionStones).join(',')

  if (cache.has(key)) return cache.get(key)

  const count =
    CARDS.filter(isCardMatchingCriteria(criteria)).length +
    Number(countFusionStones)

  cache.set(key, count)

  return count
}

export default countCards
