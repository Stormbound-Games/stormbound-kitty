import member from './types/member'
import date from './types/date'

const podcast = {
  title: 'Podcast episode',
  name: 'podcast',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Meta',
      name: 'meta',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    date,
    {
      title: 'Hosts',
      name: 'hosts',
      type: 'array',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Excerpt',
      name: 'excerpt',
      type: 'string',
      validation: Rule => Rule.required().max(250),
    },
  ],
}

export default podcast
