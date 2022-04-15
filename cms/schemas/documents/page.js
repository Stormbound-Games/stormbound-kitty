import { MdOutlineFeed } from 'react-icons/md'
import banner from '../types/banner'
import icon from '../types/icon'
import getBlock from '../richText/block'
import battleSim from '../richText/battleSim'
import columns from '../richText/columns'
import card from '../richText/card'
import faq from '../richText/faq'
import image from '../richText/image'
import info from '../richText/info'
import tableOfContents from '../richText/tableOfContents'

const page = {
  title: 'Pages',
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
      validation: Rule => Rule.required(),
    },
    banner,
    {
      title: 'Breadcrumbs',
      name: 'breadcrumbs',
      type: 'array',
      options: { layout: 'tags' },
      of: [{ type: 'string' }],
      validation: Rule => Rule.min(1).max(4),
    },
    {
      title: 'Search details',
      name: 'search',
      description: 'This information is used to populate the site search.',
      type: 'object',
      fields: [
        {
          title: 'Breadcrumbs',
          name: 'breadcrumbs',
          type: 'array',
          options: { layout: 'tags' },
          of: [{ type: 'string' }],
          validation: Rule => Rule.min(1).max(3),
        },
        { ...icon, validation: Rule => Rule.required() },
      ],
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
