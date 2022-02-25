import React from 'react'
import { MdOutlineViewColumn } from 'react-icons/md'
import getBlock from './block'
import image from './image'
import info from './info'
import deckEmbed from './deck'
import card from './card'
import manaGraph from './manaGraph'

const column = {
  title: 'Column',
  name: 'column',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        getBlock({ withHeadings: true }),
        image,
        info,
        deckEmbed,
        card,
        manaGraph,
      ],
      validation: Rule => Rule.required(),
    },
  ],
}

const columns = {
  title: 'Columns',
  name: 'columns',
  type: 'object',
  icon: MdOutlineViewColumn,
  fields: [
    {
      title: 'Columns',
      name: 'columns',
      type: 'array',
      of: [column],
      validation: Rule => Rule.min(2).max(5),
    },
    {
      title: 'Wide',
      name: 'wide',
      description: 'Expand the 2 columns to be wider than the container.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ document }) => document.columns.length !== 2,
    },
  ],
  preview: {
    select: { columns: 'columns', wide: 'wide' },
    prepare({ columns, wide }) {
      return {
        title: 'Columns',
        subtitle:
          columns.length +
          ' column' +
          (columns.length === 1 ? '' : 's') +
          (wide ? ' in wide mode' : ' in narrow mode'),
        media: <MdOutlineViewColumn />,
      }
    },
  },
}

export default columns
