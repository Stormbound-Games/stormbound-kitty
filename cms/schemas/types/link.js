const link = {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'Path or URL',
      name: 'href',
      type: 'string',
      validation: Rule =>
        Rule.required().custom(value => {
          if (value && value.includes('localhost')) return 'Invalid local link.'
          return true
        }),
    },
  ],
}

export default link
