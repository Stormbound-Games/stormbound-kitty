import React from 'react'
import { MdHealing } from 'react-icons/md'

const nerfCompensation = {
  title: 'Nerf compensation',
  name: 'nerfCompensation',
  type: 'object',
  icon: MdHealing,
  fields: [
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
      const cardNames = Object.entries(rest)
        .filter(([key, value]) => key.startsWith('cardName') && Boolean(value))
        .map(entry => entry[1])
        .sort()

      return {
        title: 'Nerf compensation info',
        subtitle: cardNames.join(', '),
        media: <MdHealing />,
      }
    },
  },
}

export default nerfCompensation
