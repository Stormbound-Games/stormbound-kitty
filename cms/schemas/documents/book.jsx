import {
  orderableDocumentListDeskItem,
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { MdMenuBook } from 'react-icons/md'
import { FACTIONS, UNIT_TYPES, TYPES, RARITIES } from '#constants/game'
import capitalize from '#helpers/capitalize'

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
          { title: 'Ability', value: 'ability' },
          { title: 'Faction', value: 'faction' },
          { title: 'Name', value: 'name' },
          { title: 'Rarity', value: 'rarity' },
          { title: 'Type', value: 'type' },
          { title: 'Unit type', value: 'unitType' },
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
      name: 'value_unitType',
      type: 'string',
      options: { list: UNIT_TYPES },
      hidden: ({ parent }) => parent?.property !== 'unitType',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.parent?.property !== 'unitType') return true
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
  __experimental_search: [],
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
      description:
        'Odds are expressed as numbers between 0 and 1 (e.g. 0.1 means 10%).',
      type: 'array',
      of: [
        {
          type: 'number',
          validation: Rule => Rule.required().positive().precision(2).max(1),
        },
      ],
      validation: Rule => Rule.required().min(4).max(4),
    },
    {
      title: 'Fusion stones odds',
      name: 'fsOdds',
      description:
        'Odds are expressed as a number between 0 and 1 (e.g. 0.1 means 10%).',
      type: 'number',
      validation: Rule => Rule.required().positive().precision(2).max(1),
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
      name: 'allowDuplicates',
      title: 'Allow duplicates',
      type: 'boolean',
      description: 'Whether the same card can be drawn more than once.',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    orderRankField({ type: 'book' }),
  ],
  ordering: [orderRankOrdering],
  preview: {
    select: {
      cost: 'cost',
      image: 'image',
      name: 'name',
      odds: 'odds',
    },
    prepare({ cost, image, name, odds }) {
      return {
        title: name,
        subtitle: cost
          ? cost.amount +
            ' ' +
            capitalize(cost.type.toLowerCase()) +
            ' · ' +
            odds.map(o => +o * 100).join('/') +
            ' (%)'
          : undefined,
        media: image,
      }
    },
  },
}

export default book

export const bookOrder = (S, context) =>
  orderableDocumentListDeskItem({
    type: 'book',
    title: 'Books order',
    S,
    context,
  })
