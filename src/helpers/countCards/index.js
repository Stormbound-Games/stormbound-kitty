import cards from '../../data/cards'

const matchRace = race => card => !race || card.race === race
const matchRarity = rarity => card => !rarity || card.rarity === rarity
const matchElder = elder => card => !elder || card.elder

const cache = new Map()

const countCards = (criteria, countFusionStones = true) => {
  const key = Object.values(criteria).sort().join(',')

  if (cache.has(key)) return cache.get(key)

  const count =
    cards
      .filter(matchRace(criteria.race))
      .filter(matchRarity(criteria.rarity))
      .filter(matchElder(criteria.elder)).length + Number(countFusionStones)

  cache.set(key, count)

  return count
}

export default countCards
