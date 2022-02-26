import { MdBookmark } from 'react-icons/md'
import member from '../types/member'
import date from '../types/date'
import deckId from '../types/deckId'
import { TAGS } from '~/constants/deck'
import { formatDate } from '~/helpers/formatDate'

const deck = {
  title: 'Deck',
  name: 'deck',
  type: 'document',
  icon: MdBookmark,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { ...deckId, name: 'id' },
    member,
    date,
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
    { ...date, title: 'Nerf date', name: 'nerfed', validation: undefined },
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      author: 'author',
      date: 'date',
    },
    prepare({ name, author, date }) {
      return {
        title: name || 'Missing name',
        subtitle:
          'By ' +
          (author || 'missing member') +
          ' in ' +
          (formatDate(date) || 'missing date'),
      }
    },
  },
}

export default deck
