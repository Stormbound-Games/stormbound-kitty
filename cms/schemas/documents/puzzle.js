import { MdExtension } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import { CATEGORIES, RESTRICTIONS } from '~/constants/puzzles'
import { formatDate } from '~/helpers/formatDate'
import getBlock from '../richText/block'

const puzzle = {
  title: 'Puzzle',
  name: 'puzzle',
  type: 'document',
  icon: MdExtension,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: Object.entries(CATEGORIES).map(([category, description]) => ({
          title: description,
          value: category,
        })),
      },
    },
    { ...user, title: 'Author' },
    {
      title: 'Board ID',
      name: 'board',
      type: 'string',
      description:
        'The ID of a battle sim as displayed in the URL (minus the domain name and the path).',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Restrictions',
      name: 'restrictions',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: Object.entries(RESTRICTIONS).map(([restriction, data]) => ({
              title: data.name,
              value: restriction,
            })),
          },
        },
      ],
    },
    date,
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'An image of the board, cut right around its edges.',
      options: {
        accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Solution',
      name: 'solution',
      type: 'array',
      of: [getBlock()],
    },
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
      author: 'user.name',
      name: 'name',
      date: 'date',
      image: 'image',
    },
    prepare({ author, name, date, image }) {
      return {
        title: name || 'Missing name',
        subtitle:
          'By ' +
          (author || 'missing member') +
          ' in ' +
          (formatDate(date) || 'missing date'),
        media: image,
      }
    },
  },
}

export default puzzle
