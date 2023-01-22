import React from 'react'
import { MdOutlineViewModule } from 'react-icons/md'

const tierList = {
  title: 'Tier list',
  name: 'tierList',
  type: 'object',
  icon: MdOutlineViewModule,
  fields: [
    {
      title: 'List ID',
      name: 'id',
      type: 'string',
      description:
        'The ID of a tier list as displayed in the URL (minus the domain name and the path).',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: { id: 'id' },
    prepare({ id }) {
      return {
        title: 'Tier list',
        subtitle: id,
        media: <MdOutlineViewModule />,
      }
    },
  },
}

export default tierList
