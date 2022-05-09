import { MdAutoFixNormal } from 'react-icons/md'
import user from '../types/user'
import { formatDate } from '~/helpers/formatDate'

const swcc = {
  title: 'SWCC',
  name: 'SWCC',
  type: 'document',
  icon: MdAutoFixNormal,
  fields: [
    {
      title: 'Season number',
      name: 'season',
      type: 'number',
      validation: Rule => Rule.required().positive().min(1),
    },
    {
      title: 'Week number',
      name: 'week',
      type: 'number',
      validation: Rule => Rule.required().positive().min(1),
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    { ...user, title: 'Author' },
    {
      title: 'Card ID',
      name: 'id',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      season: 'season',
      week: 'week',
      name: 'name',
      author: 'user.name',
      date: 'date',
    },
    prepare({ season = '?', week = '?', author, name, date }) {
      return {
        title: ['Season ' + season, 'Week ' + week, name]
          .filter(Boolean)
          .join(' · '),
        subtitle:
          'By ' +
          (author || 'missing member') +
          ' in ' +
          (formatDate(date) || 'missing date'),
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
}

export default swcc
