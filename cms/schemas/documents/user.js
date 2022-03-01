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
