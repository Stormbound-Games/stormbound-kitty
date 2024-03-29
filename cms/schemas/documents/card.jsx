import { MdWysiwyg } from 'react-icons/md'
import { FACTIONS, UNIT_TYPES, TYPES, RARITIES } from '#constants/game'
import getBlock from '../richText/block'

const card = {
  title: 'Cards',
  name: 'card',
  type: 'document',
  icon: MdWysiwyg,
  __experimental_search: [{ weight: 2, path: 'name' }],
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
      type: 'slug',
      validation: Rule =>
        Rule.required().custom(value => {
          if (/^[NSFWIT]\d+$/.test(value.current)) return true
          return 'The ID is invalid: it should be N, S, F, W, I or T followed by a number.'
        }),
    },
    {
      title: 'Stormbound ID',
      name: 'sid',
      type: 'slug',
      description: 'The card ID used by the game itself, provided by the team.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: { list: TYPES },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Faction',
      name: 'faction',
      type: 'string',
      options: { list: FACTIONS },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Unit type',
      name: 'unitTypes',
      type: 'array',
      of: [
        {
          type: 'string',
          options: { list: UNIT_TYPES.slice().sort() },
        },
      ],
      hidden: ({ document }) => Boolean(document?.type !== 'unit'),
    },
    {
      title: 'Rarity',
      name: 'rarity',
      type: 'string',
      options: { list: RARITIES },
      validation: Rule =>
        Rule.custom((value, context) => {
          // Token cards do not have a concept of rarity: they are common.
          if (!context.document?.token && !value) return 'Required'
          return true
        }),
    },
    {
      title: 'Mana',
      name: 'mana',
      type: 'string',
      description:
        'Either a numeric value, or a series of numeric values separated by slashes (e.g. 1/2/3/4/5).',
      validation: Rule =>
        Rule.required().custom(value => {
          if (/^\d+$/.test(value)) return true
          if (/^\d+\/\d+\/\d+\/\d+\/\d+$/.test(value)) return true
          return 'Invalid'
        }),
    },
    {
      title: 'Strength',
      name: 'strength',
      type: 'string',
      description:
        'Either a numeric value, or a series of numeric values separated by slashes (e.g. 1/2/3/4/5).',
      hidden: ({ document }) => Boolean(document?.type === 'spell'),
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.document?.type === 'spell') return true
          if (!value) return 'Required'
          if (/^\d+$/.test(value)) return true
          if (/^\d+\/\d+\/\d+\/\d+\/\d+$/.test(value)) return true
          return 'Invalid'
        }),
    },
    {
      title: 'Movement',
      name: 'movement',
      type: 'string',
      description:
        'Either a numeric value, or a series of numeric values separated by slashes (e.g. 1/2/3/4/5).',
      hidden: ({ document }) => Boolean(document?.type !== 'unit'),
      validation: Rule =>
        Rule.custom((value, context) => {
          if (context.document?.type !== 'unit') return true
          if (!value) return 'Required'
          if (/^\d+$/.test(value)) return true
          if (/^\d+\/\d+\/\d+\/\d+\/\d+$/.test(value)) return true
          return 'Invalid'
        }),
    },
    {
      title: 'Fixed movement',
      name: 'fixedMovement',
      type: 'boolean',
      description: 'Whether the card has fixed movement.',
      hidden: ({ document }) => Boolean(document?.type !== 'unit'),
      defaultValue: false,
    },
    {
      title: 'Ability',
      name: 'ability',
      type: 'text',
      description:
        'Wrapping text with stars causes it to be bold (e.g. *bordering*).',
      validation: Rule =>
        Rule.custom(value => {
          if (!value) return true

          if (value && value.endsWith('.'))
            return 'Ability should not end with a period'

          const slashes = value.match(/\//g)?.length ?? 0
          if (slashes % 4 !== 0) return 'Unexpected number of slashes (/)'

          const stars = value.match(/\*/g)?.length ?? 0
          if (stars % 2 !== 0) return 'Unexpected number of stars (*)'

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
      title: 'Token',
      name: 'token',
      description:
        'Token cards are cards which are not part of the default card collection, such as event-specific or spawned cards.',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Without level',
      name: 'withoutLevel',
      description:
        'Whether the token card is a “pure” token, which does not have a concept of leveling at all (e.g. Token Construct).',
      type: 'boolean',
      hidden: ({ document }) => !document.token,
      initialValue: false,
    },
    {
      title: 'Additional notes',
      name: 'notes',
      type: 'array',
      of: [getBlock()],
      hidden: ({ document }) => document.withoutLevel,
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
    select: {
      name: 'name',
      image: 'image',
      rarity: 'rarity',
      faction: 'faction',
      race: 'race',
      unitTypes: 'unitTypes',
      type: 'type',
    },
    prepare({ name, image, rarity, faction, race, type, unitTypes }) {
      const types = unitTypes ? unitTypes : [race]

      return {
        title: name,
        subtitle: [rarity, faction, types.join(' '), type]
          .filter(Boolean)
          .join(' · '),
        media: image,
      }
    },
  },
}

export default card
