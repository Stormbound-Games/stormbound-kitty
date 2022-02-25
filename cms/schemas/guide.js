import { MdExplore } from 'react-icons/md'
import member from './types/member'
import date from './types/date'
import cardId from './types/cardId'
import image from './types/image'
import getBlock from './types/block'
import formatDate from './helpers/formatDate'
import battleSim from './types/battleSim'
import columns from './types/columns'
import card from './types/card'
import info from './types/info'
import tableOfContents from './types/tableOfContents'
import tierList from './types/tierList'
import { CATEGORIES } from '~/constants/guides'

const guide = {
  title: 'Guide',
  name: 'guide',
  type: 'document',
  icon: MdExplore,
  fieldsets: [
    {
      name: 'metadata',
      title: 'Metadata',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      fieldset: 'metadata',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Identifier',
      name: 'id',
      fieldset: 'metadata',
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
      title: 'Category',
      name: 'category',
      type: 'string',
      fieldset: 'metadata',
      options: {
        list: Object.entries(CATEGORIES).map(([category, data]) => ({
          title: data.name.short,
          value: category,
        })),
      },
      validation: Rule => Rule.required().uppercase(),
    },
    { ...date, fieldset: 'metadata' },
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      fieldset: 'metadata',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    { ...cardId, fieldset: 'metadata' },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'string',
      fieldset: 'metadata',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        getBlock({ withHeadings: true, withNotice: true }),
        image,
        columns,
        info,
        tableOfContents,
        card,
        battleSim,
        { type: 'table' },
        tierList,
      ],
    },
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
