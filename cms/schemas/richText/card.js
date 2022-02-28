import React from 'react'
import { MdPadding } from 'react-icons/md'
import cardRef from '../types/cardRef'

const card = {
  title: 'Card',
  name: 'card',
  type: 'object',
  icon: MdPadding,
  fields: [
    cardRef,
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
  preview: {
    select: { cardId: 'cardId', name: 'card.name' },
    prepare({ cardId, name }) {
      const cardName = name || cards.find(card => card.id === cardId)?.name

      return {
        title: `Card ${cardName ? `(${cardName})` : ''}`,
        media: <MdPadding />,
      }
    },
  },
}

export default card
