import React from 'react'
import { MdAutoAwesomeMotion } from 'react-icons/md'
import date from '../types/date'
import deckId from '../types/deckId'

const deck = {
  title: 'Deck',
  // The `deck` name is already taken by the featured deck document type (which
  // should have been called `featuredDeck`…).
  name: 'deckEmbed',
  type: 'object',
  icon: MdAutoAwesomeMotion,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { ...deckId, name: 'id' },
    { ...date, validation: undefined },
    {
      title: 'Tags',
      name: 'deckTags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'deckTag' }] }],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: { id: 'id', name: 'name' },
    prepare({ id, name }) {
      return {
        title: `Deck ${name ? `(${name})` : ''}`,
        subtitle: id,
        media: <MdAutoAwesomeMotion />,
      }
    },
  },
}

export default deck
