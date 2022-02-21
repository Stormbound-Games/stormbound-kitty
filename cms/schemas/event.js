import member from './types/member'
import date from './types/date'
import json from './types/json'

const event = {
  title: 'Event',
  name: 'event',
  type: 'document',
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: { list: [{ title: 'SWCC', value: 'SWCC' }] },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Members',
      name: 'authors',
      type: 'array',
      of: [member],
      validation: Rule => Rule.min(1),
    },
    date,
    { title: 'Event data', name: 'data', ...json },
  ],
  preview: {
    select: {
      type: 'type',
      date: 'date',
    },
    prepare({ type, date }) {
      const formatter = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
      })
      const parts = formatter.formatToParts(new Date(date))
      const month = parts[0].value
      const year = parts[2].value

      return {
        title: type,
        subtitle: month + ' ' + year,
      }
    },
  },
}

export default event
