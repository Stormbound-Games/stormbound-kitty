import { MdBookmark } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import deckId from '../types/deckId'
import { formatDate } from '#helpers/formatDate'

const deck = {
  title: 'Decks',
  name: 'deck',
  type: 'document',
  icon: MdBookmark,
  __experimental_search: [{ path: 'name' }],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { ...deckId, name: 'id' },
    { ...user, title: 'Author' },
    date,
    {
      title: 'Tags',
      name: 'deckTags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'deckTag' }] }],
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
      author: 'user.name',
      date: 'date',
    },
    prepare({ name, author, date }) {
      return {
        title: name || 'Missing name',
        subtitle:
          'By ' +
          (author || 'missing author') +
          ' in ' +
          (formatDate(date) || 'missing date'),
      }
    },
  },
}

export default deck
