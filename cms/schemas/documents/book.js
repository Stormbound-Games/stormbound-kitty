import { MdMenuBook } from 'react-icons/md'
import { FACTIONS, UNIT_TYPES, TYPES, RARITIES } from '~/constants/game'

const restriction = {
  title: 'Restriction',
  name: 'restriction',
  type: 'object',
  fields: [
    {
      title: 'Property',
      name: 'property',
      type: 'string',
      options: {
        list: [
          // @TODO: handle unitTypes
          'ability',
          'ancient',
          'elder',
          'faction',
          'hero',
          'name',
          'race',
          'rarity',
          'type',
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Value',
      name: 'value_race',
      type: 'string',
      options: { list: UNIT_TYPES },
      hidden: ({ parent }) => parent?.property !== 'race',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'race') return true
          if (!value) return 'Required'
          return true
        }),
    },
    {
      title: 'Value',
      name: 'value_faction',
      type: 'string',
      options: { list: FACTIONS },
      hidden: ({ parent }) => parent?.property !== 'faction',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'faction') return true
          if (!value) return 'Required'
          return true
        }),
    },
    {
      title: 'Value',
      name: 'value_type',
      type: 'string',
      options: { list: TYPES },
      hidden: ({ parent }) => parent?.property !== 'type',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'type') return true
          if (!value) return 'Required'
          return true
        }),
    },
    {
      title: 'Value',
      name: 'value_rarity',
      type: 'string',
      options: { list: RARITIES },
      hidden: ({ parent }) => parent?.property !== 'rarity',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'rarity') return true
          if (!value) return 'Required'
          return true
        }),
    },
    {
      title: 'Value',
      name: 'value_elder',
      type: 'boolean',
      hidden: ({ parent }) => parent?.property !== 'elder',
    },
    {
      title: 'Value',
      name: 'value_ancient',
      type: 'boolean',
      hidden: ({ parent }) => parent?.property !== 'ancient',
    },
    {
      title: 'Value',
      name: 'value_hero',
      type: 'boolean',
      hidden: ({ parent }) => parent?.property !== 'hero',
    },
    {
      title: 'Value',
      name: 'value_ability',
      type: 'string',
      hidden: ({ parent }) => parent?.property !== 'ability',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'ability') return true
          if (!value) return 'Required'
          return true
        }),
    },
    {
      title: 'Value',
      name: 'value_name',
      type: 'string',
      hidden: ({ parent }) => parent?.property !== 'name',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'name') return true
          if (!value) return 'Required'
          return true
        }),
    },
  ],
}

const book = {
  title: 'Books',
  name: 'book',
  type: 'document',
  icon: MdMenuBook,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Identifier',
      name: 'id',
      description: 'The identifier is used to map this book to certain tools.',
      type: 'string',
      validation: Rule =>
        Rule.required()
          .uppercase()
          .custom(
            string =>
              !string.includes(' ') || 'Identifier cannot contain spaces.'
          ),
    },
    {
      title: 'Cost',
      name: 'cost',
      type: 'object',
      fields: [
        {
          title: 'Amount',
          name: 'amount',
          type: 'number',
          validation: Rule => Rule.required().min(1),
        },
        {
          title: 'Type',
          name: 'type',
          type: 'string',
          options: {
            list: [
              { title: 'Rubies', value: 'RUBIES' },
              { title: 'Coins', value: 'COINS' },
              { title: 'Advertisement', value: 'AD' },
            ],
          },
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required(),
    },
    {
      title: 'Draws',
      name: 'draws',
      type: 'number',
      validation: Rule => Rule.required().integer().positive().min(1),
    },
    {
      title: 'Odds',
      name: 'odds',
      type: 'array',
      of: [
        {
          type: 'number',
          validation: Rule =>
            Rule.required().positive().precision(2).min(0).max(1),
        },
      ],
      validation: Rule => Rule.required().min(4).max(4),
    },
    {
      title: 'Restrictions',
      name: 'restrictions',
      type: 'array',
      of: [restriction],
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
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
  ],
}

export default book
