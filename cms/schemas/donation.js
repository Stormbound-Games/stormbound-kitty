import member from './types/member'
import date from './types/date'
import formatDate from './helpers/formatDate'

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
      return {
        title: author,
        subtitle: formatDate(date),
      }
    },
  },
}

export default donation
