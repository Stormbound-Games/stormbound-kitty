import React from 'react'
import { MdPadding } from 'react-icons/md'
import cardId from '../types/cardId'
import cards from '~/data/cards'

const card = {
  title: 'Card',
  name: 'card',
  type: 'object',
  icon: MdPadding,
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
  preview: {
    select: { cardId: 'cardId' },
    prepare({ cardId }) {
      const { name } = cards.find(card => card.id === cardId)

      return {
        title: `Card ${name ? `(${name})` : ''}`,
        media: <MdPadding />,
      }
    },
  },
}

export default card
