import React from 'react'
import { MdGridOn } from 'react-icons/md'
import cardLink from './cardLink'
import link from './link'

const battleSimEmbed = {
  title: 'Battle Sim',
  name: 'battleSim',
  type: 'object',
  icon: MdGridOn,
  fields: [
    {
      title: 'Board ID',
      name: 'board',
      type: 'string',
      description:
        'The ID of a battle sim as displayed in the URL (minus the domain name and the path).',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
            annotations: [link, cardLink],
          },
        },
      ],
    },
    {
      title: 'Environment',
      name: 'environment',
      type: 'string',
      description: 'The theme of the battle sim board.',
      options: {
        list: [
          'neutral',
          'ironclad',
          'shadowfen',
          'swarm',
          'winter',
          'dragon',
          'feline',
        ],
      },
    },
  ],
  preview: {
    select: { board: 'board' },
    prepare({ board }) {
      return {
        title: 'Battle Sim',
        subtitle: board,
        media: <MdGridOn />,
      }
    },
  },
}

export default battleSimEmbed
