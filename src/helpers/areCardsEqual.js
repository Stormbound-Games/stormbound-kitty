export default (card1, card2) => {
  if (!card1) {
    return !card2
  }
  if (!card2) {
    return false
  }
  return card1.id === card2.id && card1.idx === card2.idx
}
