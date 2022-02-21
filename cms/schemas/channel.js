import member from './types/member'

const channels = {
  title: 'Channel',
  name: 'channel',
  type: 'document',
  fields: [
    member,
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
