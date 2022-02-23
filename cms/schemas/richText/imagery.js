import React from 'react'

const image = {
  title: 'Image',
  name: 'image',
  type: 'image',
  description: 'A high-quality image (the CDN will do the optimization).',
  options: {
    accept: ['image/jpeg', 'image/png', 'image/gif'],
  },
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: Rule => Rule.required(),
    },
  ],
}

const imagery = {
  title: 'Imagery',
  name: 'imagery',
  description: 'One or more images displayed one next to another.',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [image],
      validation: Rule => Rule.min(1).max(5),
    },
  ],
  preview: {
    select: { images: 'images' },
    component: ({ value }) => (
      <>
        Imagery module with{' '}
        {value.images.length +
          ' image' +
          (value.images.length === 1 ? '' : 's')}
      </>
    ),
  },
}

export default imagery
