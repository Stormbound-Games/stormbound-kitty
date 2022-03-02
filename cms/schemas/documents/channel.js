import { MdPlayCircleOutline } from 'react-icons/md'
import user from '../types/user'

const channel = {
  title: 'YouTube Channel',
  name: 'channel',
  type: 'document',
  icon: MdPlayCircleOutline,
  fields: [
    user,
    {
      title: 'Link',
      name: 'href',
      type: 'url',
      description: 'The URL of the person’s channel on YouTube.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'url',
      description: 'The URL of the person’s avatar on YouTube.',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      user: 'user.name',
      description: 'description',
    },
    prepare({ user, description }) {
      return {
        title: user || 'Missing member',
        subtitle: description,
      }
    },
  },
}

export default channel
