import { MdWysiwyg } from 'react-icons/md'
import { FACTIONS, RACES, TYPES, RARITIES } from '~/constants/game'

const card = {
  title: 'Card',
  name: 'card',
  type: 'document',
  icon: MdWysiwyg,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Stormbound-Kitty ID',
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required().uppercase(),
    },
    {
      title: 'Stormbound ID',
      name: 'sid',
      type: 'string',
      validation: Rule => Rule.required().lowercase(),
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: { list: Object.keys(TYPES) },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Faction',
      name: 'faction',
      type: 'string',
      options: { list: Object.keys(FACTIONS) },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Race',
      name: 'race',
      type: 'string',
      options: { list: Object.keys(RACES) },
      hidden: ({ document }) => Boolean(document?.type !== 'unit'),
    },
    {
      title: 'Rarity',
      name: 'rarity',
      type: 'string',
      options: { list: Object.keys(RARITIES) },
      validation: Rule =>
        Rule.custom((value, context) => {
          if (!context.document?.token && !value) return 'Required'
          return true
        }),
    },
    {
      title: 'Mana',
      name: 'mana',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Strength',
      name: 'strength',
      type: 'string',
      hidden: ({ document }) => Boolean(document?.type === 'spell'),
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.document?.type !== 'spell' && !value) return 'Required'
          return true
        }),
    },
    {
      title: 'Movement',
      name: 'movement',
      type: 'string',
      validation: Rule => Rule.required(),
      hidden: ({ document }) => Boolean(document?.type !== 'unit'),
    },
    {
      title: 'Ability',
      name: 'ability',
      type: 'text',
      description:
        'Wrapping text with stars causes it to be bold (e.g. *bordering*).',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.document?.type === 'spell' && !value) return 'Required'
          return true
        }),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'A high-quality image (the CDN will do the optimization).',
      options: {
        accept: ['image/png'],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Hero',
      name: 'hero',
      type: 'boolean',
      initialValue: false,
      hidden: ({ document }) => document?.type !== 'unit',
    },
    {
      title: 'Elder',
      name: 'elder',
      type: 'boolean',
      initialValue: false,
      hidden: ({ document }) => document?.type !== 'unit',
    },
    {
      title: 'Ancient',
      name: 'ancient',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Token',
      name: 'token',
      type: 'boolean',
      initialValue: false,
      hidden: ({ document }) => document?.type !== 'unit',
    },
  ],
  orderings: [
    {
      title: 'Game order',
      name: 'gameOrder',
      by: [
        { field: 'faction', direction: 'desc' },
        { field: 'mana', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { name: 'name', image: 'image' },
    prepare({ name, image }) {
      return {
        title: name,
        media: image,
      }
    },
  },
}

export default card
