import { MdOutlineImage } from 'react-icons/md'
import json from '../types/json'

const image = {
  title: 'Image',
  name: 'image',
  type: 'image',
  icon: MdOutlineImage,
  fields: [
    {
      title: 'Description',
      name: 'alt',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    },
    {
      title: 'Wide',
      name: 'wide',
      description: 'Only relevant when used outside of a column.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ document, parent }) => {
        const key = parent._key
        const blocks = document.content || []
        const isTopLevelImage = blocks.find(item => item._key === key)

        return !isTopLevelImage
      },
    },
    {
      ...json,
      title: 'Styles',
      name: 'extend',
      description:
        'JSON blob of styles to extend the image with. Use carefully.',
    },
  ],
  preview: {
    select: { alt: 'alt', asset: 'asset' },
    prepare({ alt, asset }) {
      return {
        title: 'Image',
        subtitle: alt,
        media: asset,
      }
    },
  },
}

export default image
