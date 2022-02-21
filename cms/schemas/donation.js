import member from './types/member'
import date from './types/date'

const donation = {
  title: 'Donation',
  name: 'donation',
  type: 'document',
  fields: [member, date],
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

export default donation
