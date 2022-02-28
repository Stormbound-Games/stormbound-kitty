import React from 'react'
import { MdHealing } from 'react-icons/md'
import cardId from '../types/cardId'
import getRawCardData from '~/helpers/getRawCardData'

const nerfCompensation = {
  title: 'Nerf compensation',
  name: 'nerfCompensation',
  type: 'object',
  icon: MdHealing,
  fields: [
    {
      title: 'Nerfed cards (legacy)',
      name: 'ids',
      description:
        'Optional list of cards that are nerfed, otherwise display generic information.',
      type: 'array',
      of: [cardId],
    },
    {
      title: 'Nerfed cards',
      name: 'cards',
      description:
        'Optional list of cards that are nerfed, otherwise display generic information.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'card' }] }],
    },
  ],
  preview: {
    select: {
      ids: 'ids',
      cards: 'cards',
      ...Array.from({ length: 10 }, (_, i) => i).reduce(
        (acc, i) => ({
          ...acc,
          ['cardName' + i]: `cards.${i}.name`,
        }),
        {}
      ),
    },
    prepare({ ids = [], ...rest }) {
      const legacyCardNames = ids.map(id => getRawCardData(id).name)
      const cardNames = Object.entries(rest)
        .filter(([key, value]) => key.startsWith('cardName') && Boolean(value))
        .map(entry => entry[1])
        .sort()

      return {
        title: 'Nerf compensation info',
        subtitle: (cardNames.length ? cardNames : legacyCardNames).join(', '),
        media: <MdHealing />,
      }
    },
  },
}

export default nerfCompensation
