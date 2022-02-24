import cardId from './cardId'

const card = {
  title: 'Card',
  name: 'card',
  type: 'object',
  fields: [
    cardId,
    {
      title: 'Level',
      name: 'level',
      type: 'number',
      description:
        'Only relevant when rendered inside a column, as all levels are displayed otherwise.',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 1,
    },
  ],
}

export default card
