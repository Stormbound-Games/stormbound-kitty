import { MdAttachMoney } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import { formatDate } from '~/helpers/formatDate'

const donation = {
  title: 'Donations',
  name: 'donation',
  type: 'document',
  icon: MdAttachMoney,
  fields: [{ ...user, title: 'Donator' }, date],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      donator: 'user.name',
      date: 'date',
    },
    prepare({ donator, date }) {
      return {
        title: donator || 'Missing donator',
        subtitle: formatDate(date) || 'Missing date',
      }
    },
  },
}

export default donation
