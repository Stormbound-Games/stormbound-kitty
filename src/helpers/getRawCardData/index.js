import cards from '../../data/cards'

const reference = cards.reduce((acc, card) => ({ ...acc, [card.id]: card }), {})

export default id => reference[id] || {}
