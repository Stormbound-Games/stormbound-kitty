import cards from '~/data/cards'

const cardId = {
  title: 'Card ID',
  name: 'cardId',
  type: 'string',
  options: {
    list: cards.map(card => ({ title: card.name, value: card.id })),
  },
  validation: Rule => Rule.required().uppercase(),
}

export default cardId
