import getBlock from './block'

const info = {
  title: 'Info',
  name: 'info',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: { list: ['compass', 'sword', 'stack'] },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [getBlock()],
    },
  ],
}

export default info
