import { MdOutlineNewReleases } from 'react-icons/md'
import cardId from '../types/cardId'
import cardRef from '../types/cardRef'
import date from '../types/date'
import getBlock from '../richText/block'
import battleSim from '../richText/battleSim'
import cheapenedBrawl from '../richText/cheapenedBrawl'
import columns from '../richText/columns'
import card from '../richText/card'
import faq from '../richText/faq'
import image from '../richText/image'
import info from '../richText/info'
import nerfCompensation from '../richText/nerfCompensation'
import tableOfContents from '../richText/tableOfContents'
import { formatDate } from '~/helpers/formatDate'

const release = {
  title: 'Release notes',
  name: 'release',
  type: 'document',
  icon: MdOutlineNewReleases,
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
      name: 'title',
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
      description:
        'The identifier is used to map this release’s metadata to the actual content.',
      type: 'string',
      fieldset: 'metadata',
      validation: Rule =>
        Rule.required()
          .uppercase()
          .custom(
            string =>
              !string.includes(' ') || 'Identifier cannot contain spaces.'
          ),
    },
    { ...date, fieldset: 'metadata' },
    { ...cardId, fieldset: 'metadata' },
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
        faq,
        nerfCompensation,
        cheapenedBrawl,
        { type: 'table' },
        battleSim,
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
      validation: Rule => Rule.required(),
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
