import { MdOutlineImage } from 'react-icons/md'
import json from './json'

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
      ...json,
      title: 'Styles',
      name: 'extend',
      description:
        'JSON blob of styles to extend the image with. Use carefully.',
    },
  ],
}

export default image
