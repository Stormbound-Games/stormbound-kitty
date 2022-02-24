const link = {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'Path or URL',
      name: 'href',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
}

export default link
