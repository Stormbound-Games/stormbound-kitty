import cardId from './cardId'

const cardLink = {
  title: 'Card link',
  name: 'cardLink',
  type: 'object',
  fields: [
    {
      ...cardId,
      description:
        'Note: card names are automatically linked provided their spelling match the official one.',
    },
  ],
}

export default cardLink
