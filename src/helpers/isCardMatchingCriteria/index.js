const isCardMatchingCriteria =
  (criteria = {}) =>
  card => {
    if (criteria.rarity && card.rarity !== criteria.rarity) return false
    if (criteria.race && card.race !== criteria.race) return false
    if (criteria.elder && !card.elder) return false
    return true
  }

export default isCardMatchingCriteria
