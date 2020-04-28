export default (card, hand) =>
  !!hand.find(
    cardInHand => card.id === cardInHand.id && card.idx === cardInHand.idx
  )
