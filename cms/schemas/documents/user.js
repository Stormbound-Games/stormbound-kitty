import { MdPersonOutline } from 'react-icons/md'

const user = {
  title: 'User',
  name: 'user',
  type: 'document',
  icon: MdPersonOutline,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Role',
      name: 'role',
      type: 'string',
      options: {
        list: [
          { title: 'Kat', value: 'KAT' },
          { title: 'Super Kat', value: 'SUPER_KAT' },
        ],
      },
    },
    {
      title: 'Player ID',
      name: 'playerId',
      type: 'number',
      validation: Rule => Rule.positive().integer().min(1000000000),
    },
    {
      title: 'YouTube channel',
      name: 'channel',
      type: 'object',
      fields: [
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
    },
  ],
  preview: {
    select: {
      name: 'name',
      slug: 'slug',
    },
    prepare({ name, slug }) {
      return {
        title: name || 'Missing name',
        subtitle: slug ? slug.current : '',
      }
    },
  },
}

export default user
