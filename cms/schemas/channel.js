const channels = {
  title: 'Channel',
  name: 'channel',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
}

export default channels
