import { MdExplore } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import cardRef from '../types/cardRef'
import image from '../richText/image'
import getBlock from '../richText/block'
import battleSim from '../richText/battleSim'
import columns from '../richText/columns'
import card from '../richText/card'
import info from '../richText/info'
import tableOfContents from '../richText/tableOfContents'
import tierList from '../richText/tierList'
import { CATEGORIES } from '~/constants/guides'
import { formatDate } from '~/helpers/formatDate'

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
      name: 'user',
      type: 'array',
      fieldset: 'metadata',
      of: [{ ...user, title: 'Author' }],
      validation: Rule => Rule.min(1),
    },
    { ...cardRef, fieldset: 'metadata' },
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
      fields: [
        {
          title: 'Banner format',
          name: 'ratio',
          type: 'number',
          description:
            'The ratio in % between the width and the height of the banner area (e.g. 50% means height = width / 2). Defaults to 20%.',
          validation: Rule => Rule.min(20).max(60),
        },
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
