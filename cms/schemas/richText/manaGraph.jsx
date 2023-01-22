import React from 'react'
import { MdAutoGraph } from 'react-icons/md'
import deckId from '../types/deckId'

const deck = {
  title: 'Mana graph',
  name: 'manaGraph',
  type: 'object',
  icon: MdAutoGraph,
  fields: [
    deckId,
    {
      title: 'Brawl modifier',
      name: 'brawl',
      type: 'reference',
      to: [{ type: 'brawl' }],
      options: { displayNew: false },
    },
    {
      title: 'With “How To”',
      name: 'withHowTo',
      type: 'boolean',
      description:
        'Whether to add a link to the mana curve guide to learn how to read the graph.',
      initialValue: false,
    },
  ],
  preview: {
    select: { deckId: 'deckId' },
    prepare({ deckId }) {
      return {
        title: 'Mana graph',
        subtitle: deckId,
        media: <MdAutoGraph />,
      }
    },
  },
}

export default deck
