import member from './member'
import date from './date'
import deckId from './deckId'
import { TAGS } from '~/constants/deck'

const deck = {
  title: 'Deck',
  // The `deck` name is already taken by the featured deck document type (which
  // should have been called `featuredDeck`…).
  name: 'deckEmbed',
  type: 'object',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { ...deckId, name: 'id' },
    member,
    { ...date, validation: undefined },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: Object.entries(TAGS).map(([value, title]) => ({
              title,
              value,
            })),
          },
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required().min(1),
    },
  ],
}

export default deck
