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
        title: author || 'Missing member',
        subtitle: formatDate(date) || 'Missing date',
      }
    },
  },
}

export default donation
