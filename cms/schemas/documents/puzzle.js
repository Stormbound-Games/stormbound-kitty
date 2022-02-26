import { MdExtension } from 'react-icons/md'
import member from '../types/member'
import date from '../types/date'
import { CATEGORIES, RESTRICTIONS } from '~/constants/puzzles'
import { formatDate } from '~/helpers/formatDate'

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
    {
      title: 'Difficulty',
      name: 'difficulty',
      type: 'number',
      validation: Rule => Rule.required(),
      options: { list: [1, 2, 3] },
    },
    member,
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
        accept: ['image/jpeg', 'image/png', 'image/gif'],
      },
      validation: Rule => Rule.required(),
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
      author: 'author',
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
