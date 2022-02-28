import cardRef from './cardRef'

const cardLink = {
  title: 'Card link',
  name: 'cardLink',
  type: 'object',
  fields: [
    {
      ...cardRef,
      description:
        'Note: card names are automatically linked provided their spelling match the official one.',
    },
  ],
}

export default cardLink
