import { MdOutlineNewReleases } from 'react-icons/md'
import cardId from '../types/cardId'
import date from '../types/date'
import { formatDate } from '~/helpers/formatDate'

const release = {
  title: 'Release Notes',
  name: 'release',
  type: 'document',
  icon: MdOutlineNewReleases,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Identifier',
      name: 'id',
      description:
        'The identifier is used to map this release’s metadata to the actual content.',
      type: 'string',
      validation: Rule =>
        Rule.required()
          .uppercase()
          .custom(
            string =>
              !string.includes(' ') || 'Identifier cannot contain spaces.'
          ),
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
      validation: Rule => Rule.required(),
    },
    {
      title: 'Banner format',
      name: 'ratio',
      type: 'number',
      description:
        'The ratio in % between the width and the height of the banner area (e.g. 50% means height = width / 2). Defaults to 20%.',
      validation: Rule => Rule.min(20).max(60),
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
      title: 'title',
      date: 'date',
      background: 'background',
    },
    prepare({ title, date, background }) {
      return {
        title: title || 'Missing title',
        subtitle: formatDate(date) || 'Missing date',
        media: background,
      }
    },
  },
}

export default release
