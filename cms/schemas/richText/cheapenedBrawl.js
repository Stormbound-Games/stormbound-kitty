import React from 'react'
import { MdMoneyOff } from 'react-icons/md'
import getBlock from './block'
import info from './info'
import blocksToText from '~/helpers/blocksToText'

const cheapenedBrawl = {
  title: 'Cheapened Brawl',
  name: 'cheapenedBrawl',
  type: 'object',
  icon: MdMoneyOff,
  fields: [
    {
      title: 'Price ratio',
      name: 'ratio',
      type: 'number',
      description:
        'Ratio of new/old price (e.g. 0.33 means 33% of the base price).',
      value: Rule => Rule.required().min(0.1).max(0.9),
    },
    {
      title: 'Section content',
      name: 'content',
      type: 'array',
      of: [getBlock(), info],
      description: 'Content of the section (defaults to “Cheapened Brawl”).',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Section title',
      name: 'title',
      type: 'string',
      description:
        'Optional title of the section (defaults to “Cheapened Brawl”).',
    },
    {
      title: 'Legacy Brawl',
      name: 'legacy',
      type: 'boolean',
      description:
        'Whether this is for the legacy Brawl, before the tier-system was introduced.',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', content: 'content', ratio: 'ratio' },
    prepare({ title, content = [], ratio }) {
      return {
        title: `${title || 'Cheapened Brawl'} ${
          ratio ? `(${ratio * 100}% of normal price)` : ''
        }`,
        subtitle: blocksToText(content),
        media: <MdMoneyOff />,
      }
    },
  },
}

export default cheapenedBrawl
