const tierList = {
  title: 'Tier list',
  name: 'tierList',
  type: 'object',
  fields: [
    {
      title: 'List ID',
      name: 'id',
      type: 'string',
      description:
        'The ID of a tier list as displayed in the URL (minus the domain name and the path).',
      validation: Rule => Rule.required(),
    },
  ],
}

export default tierList
