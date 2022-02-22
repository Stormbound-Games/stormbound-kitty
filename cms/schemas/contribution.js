import member from './types/member'
import date from './types/date'

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
      of: [{ type: 'number', validation: Rule => Rule.required() }],
      validation: Rule => Rule.min(1),
    },
  ],
  preview: {
    select: {
      author: 'author',
      date: 'date',
    },
    prepare({ author, date }) {
      const formatter = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
      })
      const parts = formatter.formatToParts(new Date(date))
      const month = parts[0].value
      const year = parts[2].value

      return {
        title: author,
        subtitle: month + ' ' + year,
      }
    },
  },
}

export default contribution
