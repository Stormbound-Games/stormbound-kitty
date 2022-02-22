import member from './types/member'
import date from './types/date'
import json from './types/json'
import formatDate from './helpers/formatDate'

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
    {
      title: 'Event data',
      name: 'data',
      description:
        'Some additional JSON payload that will be provided to the relevant feed component.',
      ...json,
    },
  ],
  preview: {
    select: {
      type: 'type',
      date: 'date',
    },
    prepare({ type, date }) {
      return {
        title: type,
        subtitle: formatDate(date),
      }
    },
  },
}

export default event
