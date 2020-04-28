export default (card, deck) => {
  return deck.find(
    cardInDeck => card.id === cardInDeck.id && card.idx === cardInDeck.idx
  )
}
