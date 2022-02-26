import cards from '~/data/cards'

const cardId = {
  title: 'Card',
  name: 'cardId',
  type: 'string',
  options: {
    list: cards
      .map(card => ({ title: card.name, value: card.id }))
      .sort((a, b) => a.title.localeCompare(b.title)),
  },
  validation: Rule => Rule.required().uppercase(),
}

export default cardId
