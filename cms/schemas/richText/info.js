import React from 'react'
import { MdInfoOutline } from 'react-icons/md'
import getBlock from './block'
import blocksToText from '~/helpers/blocksToText'
import icon from '../types/icon'

const info = {
  title: 'Info',
  name: 'info',
  type: 'object',
  icon: MdInfoOutline,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    icon,
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [getBlock()],
    },
  ],
  preview: {
    select: { title: 'title', content: 'content' },
    prepare({ title, content = [] }) {
      return {
        title,
        subtitle: blocksToText(content),
        media: <MdInfoOutline />,
      }
    },
  },
}

export default info
