import React from 'react'
import { MdHealing } from 'react-icons/md'
import cardRef from '../types/cardRef'

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
      of: [cardRef],
    },
  ],
  preview: {
    select: Array.from({ length: 10 }, (_, i) => i).reduce(
      (acc, i) => ({ ...acc, ['cardName' + i]: `cards.${i}.name` }),
      {}
    ),
    prepare(params) {
      const cardNames = Object.entries(params)
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
