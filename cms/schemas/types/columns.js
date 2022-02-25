import getBlock from './block'
import image from './image'

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
        { type: 'info' },
        { type: 'deckEmbed' },
        { type: 'card' },
        { type: 'manaGraph' },
      ],
      validation: Rule => Rule.required(),
    },
  ],
}

const columns = {
  title: 'Columns',
  name: 'columns',
  type: 'object',
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
}

export default columns
