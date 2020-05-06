export const isNotCard = card1 => card2 => !isCard(card1)(card2)

const isCard = card1 => card2 => {
  if (!card1) return !card2
  if (!card2) return false
  if (!(card1.id && card2.id && card1.id === card2.id)) return false

  if (!card1.idx) {
    return !card2.idx || card2.idx === '0'
  }

  if (!card2.idx) return card1.idx === '0'

  return card1.idx === card2.idx
}

export default isCard
