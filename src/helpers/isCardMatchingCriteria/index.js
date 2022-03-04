const isCardMatchingCriteria =
  (criteria = {}) =>
  card => {
    if (
      criteria.ability &&
      (!card.ability ||
        (card.ability && !card.ability.includes(criteria.ability)))
    )
      return false
    if (criteria.name && !card.name.includes(criteria.name)) return false
    if (criteria.rarity && card.rarity !== criteria.rarity) return false
    if (criteria.type && card.type !== criteria.type) return false
    if (criteria.race && card.race !== criteria.race) return false
    if (criteria.elder && !card.elder) return false
    return true
  }

export default isCardMatchingCriteria
