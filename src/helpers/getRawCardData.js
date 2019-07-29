import cards from '../data/cards'

export default id => cards.find(card => card.id === id) || {}
