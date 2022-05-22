const link = {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: Rule =>
        Rule.required()
          .uri({ scheme: ['http', 'https'], allowRelative: true })
          .custom(value => !value?.includes('localhost')),
    },
  ],
}

export default link
