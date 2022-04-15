import { MdOutlineNewReleases } from 'react-icons/md'
import banner from '../types/banner'
import cardRef from '../types/cardRef'
import date from '../types/date'
import user from '../types/user'
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
  title: 'Releases',
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
    { ...user, fieldset: 'metadata', title: 'Author' },
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
    banner,
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
