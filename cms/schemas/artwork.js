import member from './types/member'
import date from './types/date'
import formatDate from './helpers/formatDate'

const channels = {
  title: 'Artwork',
  name: 'artwork',
  type: 'document',
  fields: [
    member,
    date,
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'A high-quality image (the CDN will do the optimization).',
      options: {
        accept: ['image/jpeg', 'image/png', 'image/gif'],
      },
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      author: 'author',
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

export default channels
