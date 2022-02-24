import getBlock from './block'

const ICONS =
  'arrow-up,arrow-down,arrow-left,arrow-right,books,bullhorn,compass,crown,equalizer,eye,fire,gift,hammer,heart,info,pencil,quill,search,stack,star,super-star,sword,trophy,user,warning'.split(
    ','
  )

const info = {
  title: 'Info',
  name: 'info',
  type: 'object',
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
}

export default info
