import { MdWallpaper } from 'react-icons/md'

const wallpaper = {
  title: 'Wallpaper',
  name: 'wallpaper',
  type: 'document',
  icon: MdWallpaper,
  fields: [
    {
      title: 'Type',
      name: 'device',
      type: 'string',
      options: {
        list: [
          { title: 'Desktop', value: 'DESKTOP' },
          { title: 'Mobile', value: 'MOBILE' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'A high-quality image (the CDN will do the optimization).',
      options: {
        accept: ['image/jpeg', 'image/jpg', 'image/png'],
      },
      validation: Rule => Rule.required(),
    },
  ],
}

export default wallpaper
