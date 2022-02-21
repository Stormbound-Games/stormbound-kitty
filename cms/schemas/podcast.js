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
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare({ title, date }) {
      const formatter = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
      })
      const parts = formatter.formatToParts(new Date(date))
      const month = parts[0].value
      const year = parts[2].value

      return {
        title: title,
        subtitle: month + ' ' + year,
      }
    },
  },
}

export default podcast
