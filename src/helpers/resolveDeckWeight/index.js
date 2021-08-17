import getResolvedCardData from '~/helpers/getResolvedCardData'
import shuffle from '~/helpers/shuffle'

export const increaseCardWeight = weight => Math.floor(weight * 1.6) + 1

export default deck => {
  // Store the order of the deck before starting to weight id
  const deckIds = deck.map(card => card.id)
  // Resolve the cards’ data (although that could be done elsewhere)
  const resolvedDeck = deck.map(getResolvedCardData)
  // Shuffle the deck to avoid having the weight order matching the card order
  const shuffledDeck = shuffle(resolvedDeck)
  // Compute the weight of the cards in sequence
  shuffledDeck.forEach((card, index) => {
    card.weight =
      index === 0 ? 0 : increaseCardWeight(shuffledDeck[index - 1].weight)
  })
  // Recompose the deck in its original order
  return deckIds.reduce(
    (acc, id) => [...acc, shuffledDeck.find(card => card.id === id)],
    []
  )
}
