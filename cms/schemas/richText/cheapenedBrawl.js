import React from 'react'
import { MdMoneyOff } from 'react-icons/md'

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
      title: 'Legacy Brawl',
      name: 'legacy',
      type: 'boolean',
      description:
        'Whether this is for the legacy Brawl, before the tier-system was introduced.',
      initialValue: false,
    },
  ],
  preview: {
    select: { ratio: 'ratio', legacy: 'legacy' },
    prepare({ ratio, legacy }) {
      return {
        title: `Cheapened Brawl ${legacy ? '(legacy)' : ''}`,
        subtitle: ratio ? `(${ratio * 100}% of normal price)` : '',
        media: <MdMoneyOff />,
      }
    },
  },
}

export default cheapenedBrawl
