import CARDS from '~/data/cards'

const getCard = ({ id, isPreview } = {}) => {
  return CARDS.find(card => card.id === id) || null
}

export default getCard
