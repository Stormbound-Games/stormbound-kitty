import { MdOutlineFeed } from 'react-icons/md'
import getBlock from '../richText/block'
import battleSim from '../richText/battleSim'
import columns from '../richText/columns'
import card from '../richText/card'
import faq from '../richText/faq'
import image from '../richText/image'
import info from '../richText/info'
import tableOfContents from '../richText/tableOfContents'

const page = {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon: MdOutlineFeed,
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
      title: 'Description',
      name: 'description',
      type: 'string',
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
        { type: 'table' },
        battleSim,
      ],
    },
    {
      title: 'Banner',
      name: 'background',
      type: 'image',
      description:
        'A landscape image that will be displayed at the top of the page behind the title (typically 5:1).',
      options: {
        accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
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
    {
      title: 'Breadcrumbs',
      name: 'breadcrumbs',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(1).max(4),
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      background: 'background',
    },
    prepare({ title, description, background }) {
      return {
        title: title || 'Missing title',
        subtitle: description,
        media: background,
      }
    },
  },
}

export default page
