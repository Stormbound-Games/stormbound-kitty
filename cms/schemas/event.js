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
}

export default event
