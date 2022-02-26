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
      title: 'Nerfed cards',
      name: 'ids',
      description:
        'Optional list of cards that are nerfed, otherwise display generic information.',
      type: 'array',
      of: [cardId],
    },
  ],
  preview: {
    select: { ids: 'ids' },
    prepare({ ids = [] }) {
      const cards = ids.map(id => getRawCardData(id).name)

      return {
        title: 'Nerf compensation info',
        subtitle: cards.join(', '),
        media: <MdHealing />,
      }
    },
  },
}

export default nerfCompensation
