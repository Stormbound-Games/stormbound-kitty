import isCardMatchingCriteria from '~/helpers/isCardMatchingCriteria'

const cache = new Map()

const countCards = (cards, criteria, countFusionStones = true) => {
  const key = Object.values(criteria).sort().concat(countFusionStones).join(',')

  if (cache.has(key)) return cache.get(key)

  const count =
    cards.filter(isCardMatchingCriteria(criteria)).length +
    Number(countFusionStones)

  cache.set(key, count)

  return count
}

export default countCards
