import cardsIndex from './fixtures/cards'

export const getCardData = input => {
  const [id] = input.trim().split('_')

  return cardsIndex[id]
}
