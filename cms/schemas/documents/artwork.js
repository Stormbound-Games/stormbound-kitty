import { MdBrush } from 'react-icons/md'
import user from '../types/user'
import date from '../types/date'
import card from '../types/cardRef'
import { formatDate } from '~/helpers/formatDate'

const artwork = {
  title: 'Artwork',
  name: 'artwork',
  type: 'document',
  icon: MdBrush,
  fields: [
    { ...user, title: 'Author' },
    date,
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'A high-quality image (the CDN will do the optimization).',
      options: {
        accept: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
      },
      validation: Rule => Rule.required(),
    },
    {
      ...card,
      description:
        'The illustrated card (if applicable) so it shows up on the card’s page.',
      validation: undefined,
    },
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      author: 'user.name',
      date: 'date',
      image: 'image',
    },
    prepare({ author, date, image }) {
      return {
        title: author || 'Missing member',
        subtitle: formatDate(date) || 'Missing date',
        media: image,
      }
    },
  },
}

export default artwork
