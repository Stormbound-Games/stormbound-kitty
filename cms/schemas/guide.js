import { MdExplore } from 'react-icons/md'
import member from './types/member'
import date from './types/date'
import cardId from './types/cardId'
import image from './types/image'
import getBlock from './types/block'
import formatDate from './helpers/formatDate'
import { CATEGORIES } from '~/constants/guides'

const guide = {
  title: 'Guide',
  name: 'guide',
  type: 'document',
  icon: MdExplore,
  fields: [
    {
      title: 'Title',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Identifier',
      name: 'id',
      description:
        'The identifier is used to map this guide’s metadata to the actual content.',
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
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: Object.entries(CATEGORIES).map(([category, data]) => ({
          title: data.name.short,
          value: category,
        })),
      },
      validation: Rule => Rule.required().uppercase(),
    },
    date,
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    cardId,
    {
      title: 'Banner',
      name: 'background',
      type: 'image',
      description:
        'A landscape image that will be displayed at the top of the guide behind the title (typically 5:1).',
      options: {
        accept: ['image/jpeg', 'image/png', 'image/gif'],
      },
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Skip navigation',
      name: 'skipNav',
      type: 'boolean',
      description: 'Whether the guide should not appear in the navigation.',
      initialValue: false,
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        getBlock({ withHeadings: true }),
        image,
        { type: 'columns' },
        { type: 'info' },
        { type: 'tableOfContents' },
        { type: 'card' },
        { type: 'battleSim' },
        { type: 'table' },
        { type: 'tierList' },
      ],
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
      name: 'name',
      date: 'date',
      background: 'background',
    },
    prepare({ name, date, background }) {
      return {
        title: name || 'Missing name',
        subtitle: formatDate(date) || 'Missing date',
        media: background,
      }
    },
  },
}

export default guide
