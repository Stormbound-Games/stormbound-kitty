import React from 'react'
import { MdInfoOutline } from 'react-icons/md'
import getBlock from './block'
import blocksToText from '~/helpers/blocksToText'

const ICONS =
  'arrow-up,arrow-down,arrow-left,arrow-right,books,bullhorn,compass,crown,equalizer,eye,fire,gift,hammer,heart,info,pencil,quill,search,stack,star,super-star,sword,trophy,user,warning'.split(
    ','
  )

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
    {
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: { list: ICONS },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [getBlock()],
    },
  ],
  preview: {
    select: { title: 'title', content: 'content' },
    prepare({ title, content }) {
      return {
        title,
        subtitle: blocksToText(content),
        media: <MdInfoOutline />,
      }
    },
  },
}

export default info
