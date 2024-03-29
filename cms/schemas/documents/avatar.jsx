import { MdFace } from 'react-icons/md'

const avatar = {
  title: 'Avatars',
  name: 'avatar',
  type: 'document',
  icon: MdFace,
  __experimental_search: [],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'A high-quality image (the CDN will do the optimization).',
      options: {
        accept: ['image/png'],
      },
      validation: Rule => Rule.required(),
    },
  ],
}

export default avatar
