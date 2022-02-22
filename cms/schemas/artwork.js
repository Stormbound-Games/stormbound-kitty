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
        title: author,
        subtitle: formatDate(date),
        media: image,
      }
    },
  },
}

export default channels
