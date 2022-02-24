import getBlock from './block'

const column = {
  title: 'Column',
  name: 'column',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [getBlock({ withHeadings: true }), { type: 'info' }],
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
  ],
}

export default columns
