import cardLink from './cardLink'
import link from './link'

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
      options: { list: ['sword', 'stack'] },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
            annotations: [link, cardLink],
          },
        },
      ],
    },
  ],
}

export default info
