import member from './types/member'
import date from './types/date'

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
}

export default channels
