import { MdAttachMoney } from 'react-icons/md'
import member from '../types/member'
import user from '../types/user'
import date from '../types/date'
import { formatDate } from '~/helpers/formatDate'

const donation = {
  title: 'Donation',
  name: 'donation',
  type: 'document',
  icon: MdAttachMoney,
  fields: [member, user, date],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
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

export default donation
