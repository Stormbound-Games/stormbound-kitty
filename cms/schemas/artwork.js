const channels = {
  title: 'Artwork',
  name: 'artwork',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      options: { dateFormat: 'MM/YYYY' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        accept: ['image/jpeg', 'image/png', 'image/gif'],
      },
      validation: Rule => Rule.required(),
    },
  ],
}

export default channels
