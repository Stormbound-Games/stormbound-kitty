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
      description: 'The URL of the person’s channel on YouTube.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'url',
      description: 'The URL of the person’s avatar on YouTube.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
  ],
}

export default channels
