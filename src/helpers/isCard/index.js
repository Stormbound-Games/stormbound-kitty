export const isNotCard = cardA => cardB => !isCard(cardA)(cardB)

const isCard = cardA => cardB => {
  if (!cardA) return !cardB
  if (!cardB) return false

  // In some cases, `cardA` and `cardB` are just card IDs, not full card objects
  // such as for the deck highlights.
  const idA = typeof cardA === 'string' ? cardA : cardA.id
  const idB = typeof cardB === 'string' ? cardB : cardB.id

  if (!(idA && idB && idA === idB)) return false
  if (!cardA.idx) return !cardB.idx || cardB.idx === '0'
  if (!cardB.idx) return cardA.idx === '0'

  return cardA.idx === cardB.idx
}

export default isCard
