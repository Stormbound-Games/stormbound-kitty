import { MdGrading, MdLineWeight } from 'react-icons/md'
import cardRef from '../types/cardRef'

const tier = {
  title: 'Tier',
  name: 'tier',
  type: 'object',
  icon: MdLineWeight,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required().max(30),
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [cardRef],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: { name: 'name', cards: 'cards' },
    prepare({ name, cards = [] }) {
      return {
        title: name,
        subtitle: cards.length + ' card' + (cards.length === 1 ? '' : 's'),
      }
    },
  },
}

const equalTierList = {
  title: 'Equal tier list',
  name: 'equalTierList',
  type: 'document',
  icon: MdGrading,
  fields: [
    {
      title: 'Tiers',
      name: 'tiers',
      type: 'array',
      of: [tier],
      validation: Rule => Rule.required().min(1),
    },
  ],
  preview: {
    select: { tiers: 'tiers' },
    prepare({ tiers = [] }) {
      return {
        title: 'Equal tier list',
        subtitle: tiers.map(tier => tier.name).join(', '),
      }
    },
  },
}

export default equalTierList
