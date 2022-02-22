import member from './types/member'
import date from './types/date'
import formatDate from './helpers/formatDate'

const contribution = {
  title: 'Code contribution',
  name: 'contribution',
  type: 'document',
  fields: [
    member,
    date,
    {
      title: 'Pull-request numbers',
      name: 'entries',
      type: 'array',
      description:
        'The numbers of the pull-requests that were open by that person during that month.',
      of: [
        {
          type: 'number',
          validation: Rule => Rule.required().positive().min(1),
        },
      ],
      validation: Rule => Rule.min(1),
    },
  ],
  preview: {
    select: {
      author: 'author',
      date: 'date',
    },
    prepare({ author, date }) {
      return {
        title: author || 'Missing member',
        subtitle: formatDate(date) || 'Missing date',
      }
    },
  },
}

export default contribution
